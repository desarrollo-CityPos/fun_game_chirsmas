import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Si usas Material
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { RulettteService } from '../../services/roulette.services';
import confetti from 'canvas-confetti';
import { audioLose, audioWheel, audioWin } from 'src/assets/assets-routes';

// Definición de las constantes de la ruleta
const TOTAL_SEGMENTS = 6;
const PREMIO_GRANDE = '🎁 PREMIO SORPRESA'; // Solo 1 de 40 veces

@Component({
  selector: 'app-roulette',
  standalone: true, // Asumiendo que es un componente standalone
  imports: [CommonModule, MatButtonModule],
  templateUrl: './roulette.html',
  styleUrl: './roulette.css',
})
export class Roulette implements OnInit, AfterViewInit {
  // --- Estado del Componente ---
  isSpinning: boolean = false;
  showModal: boolean = false;
  resultadoGanador: string = '';

  // --- PROPIEDADES DE AUDIO ---
  private spinSound!: HTMLAudioElement;
  private winSound!: HTMLAudioElement;
  private loseSound!: HTMLAudioElement;

  // --- Propiedades del Canvas y Elementos DOM ---
  resultText!: HTMLElement;
  spinBtn!: HTMLButtonElement;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  animationId: number | null = null;

  // --- Propiedades de Animación y Lógica ---
  currentAngle: number = 0; // Ángulo actual de rotación (en radianes)

  // Usados para la animación
  startTime: number | null = null;
  targetAngle: number = 0;
  initialAngle: number = 0;

  // Lógica de probabilidad
  indiceParadaFinal: number = -1;

  // --- Datos de la Ruleta (40 segmentos para 1/40 probabilidad) ---
  segments: string[] = [];
  colors = ['#f96e6e', '#e46fd3', '#454ad1', '#96ceb4', '#b5adff'];

  // Segmentos de Consuelo (se repiten)
  PREMIOS_CONSUELO = [
    '🎅 Sigue Participando',
    '🎄 Feliz Navidad',
    '🎅 Sigue Participando',
    '🍫 Una servilleta extra',
    '🎅 Sigue Participando',
  ];

  canvasWidth: number = window.innerWidth * 0.8 > 500 ? 500 : window.innerWidth * 0.8;

  @HostListener('window:resize')
  onResize() {
    this.canvasWidth = window.innerWidth * 0.8 > 500 ? 500 : window.innerWidth * 0.8;
  }

  constructor(private rulettteService: RulettteService) {
    this.initializeSegments();
  }

  ngOnInit() {
    this.spinBtn = document.getElementById('spinBtn') as HTMLButtonElement;
    // El resto del código de inicialización va a ngAfterViewInit
  }

  ngAfterViewInit() {
    // Obtenemos los elementos del DOM después de que la vista se ha inicializado
    this.resultText = document.getElementById('resultText') as HTMLElement;
    this.canvas = document.getElementById('wheelCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    // Aseguramos el tamaño (si el canvas no tiene width/height definidos en el HTML)
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasWidth;

    // --- 1. CARGAR LOS ARCHIVOS DE AUDIO ---
    this.spinSound = new Audio(audioWheel);
    this.winSound = new Audio(audioWin);
    this.loseSound = new Audio(audioLose);

    // Configuración: El sonido de giro debe ser loopeable y tener menor volumen
    this.spinSound.loop = true;
    this.spinSound.volume = 0.8; // Ajustar volumen para que no sea muy fuerte

    // Dibujamos la ruleta inmediatamente después de inicializar el contexto
    this.drawWheel();
  }

  // --- Inicialización de 40 segmentos ---
  initializeSegments() {
    this.segments = [];

    // El segmento 0 es el premio principal (1/40 probabilidad)
    this.segments.push(PREMIO_GRANDE);

    // Los 39 restantes son premios de consuelo o perdedores
    for (let i = 1; i < TOTAL_SEGMENTS; i++) {
      const indexConsuelo = (i - 1) % this.PREMIOS_CONSUELO.length;
      this.segments.push(this.PREMIOS_CONSUELO[indexConsuelo]);
    }
  }

  // --- Lógica de Dibujo del Canvas ---
  drawWheel() {
    if (this.ctx === null) return;

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = this.canvas.width / 2;
    const arcSize = (2 * Math.PI) / TOTAL_SEGMENTS;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Dibuja los 40 segmentos
    this.segments.forEach((segment, index) => {
      // El ángulo inicial de cada segmento debe incluir el 'currentAngle' de la ruleta
      const startAngle = this.currentAngle + index * arcSize;
      const endAngle = startAngle + arcSize;

      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      this.ctx.closePath();

      // Colores (usamos el módulo para que se repitan en 40 segmentos)
      this.ctx.fillStyle = index === 0 ? '#D4Af37' : this.colors[index % this.colors.length];
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Dibuja el Texto
      this.ctx.save();
      this.ctx.translate(centerX, centerY);

      // Gira el texto junto con la ruleta
      const angleForText = startAngle + arcSize / 2;
      this.ctx.rotate(angleForText);

      this.ctx.textAlign = 'right';
      this.ctx.fillStyle = '#fff';

      const fontSize = this.canvasWidth < 400 ? 12 : 15; // Tamaño más pequeño para 40 segmentos
      this.ctx.font = `bold ${fontSize}px Arial`;

      // Sombra para contraste
      this.ctx.shadowColor = 'rgba(0,0,0,0.4)';
      this.ctx.shadowBlur = 4;
      this.ctx.shadowOffsetX = 1;
      this.ctx.shadowOffsetY = 1;

      // Dibuja el texto dentro del segmento (lejos del centro)
      this.ctx.fillText(segment, radius - 5, 5);
      this.ctx.restore();
    });
  }

  // --- Lógica de Girar ---
  spin() {
    if (this.isSpinning) return;

    // Intentar reproducir. La reproducción automática puede fallar
    // si el usuario no ha interactuado antes con la página.
    this.spinSound.play().catch((error) => {
      console.log('No se pudo iniciar la reproducción automática del sonido de giro.');
    });

    this.isSpinning = true;
    this.spinBtn.disabled = true;
    this.startTime = null; // Reiniciar el tiempo de inicio
    this.resultText.textContent = '';

    // 1. DETERMINAR EL ÍNDICE DE PARADA (1 en 40)
    // Usamos el servicio para calcular el índice donde se detendrá (ej: 0 es el premio grande)
    this.indiceParadaFinal = this.rulettteService.determinarIndiceParada(
      TOTAL_SEGMENTS,
      0 // El índice 0 es el premio principal
    );

    // 2. CALCULAR EL ÁNGULO DE PARADA
    const arcSize = (2 * Math.PI) / TOTAL_SEGMENTS;

    // Queremos que el CENTRO del segmento (indiceParadaFinal) se detenga en la posición del puntero (derecha: 0 radianes)
    // Ángulo necesario para rotar el segmento al centro de la posición de parada
    const anguloParaCentrar = this.indiceParadaFinal * arcSize + arcSize / 2;

    // 3. CALCULAR LA ROTACIÓN TOTAL (incluyendo vueltas completas)
    const vueltasCompletas = 10; // Asegura que gire al menos 10 vueltas
    const anguloBase = vueltasCompletas * 2 * Math.PI;

    // La ruleta gira. Para que un punto X se detenga en 0, la rotación total debe ser (Vueltas - X)
    // El angulo de rotación final para que el centro del segmento se alinee con 0:
    const anguloAlineacion = 2 * Math.PI - anguloParaCentrar;

    // El angulo final es: (Vueltas) + (el resto de la alineación)
    this.targetAngle = anguloBase + anguloAlineacion;

    // El ángulo desde donde partimos (normalizamos)
    this.initialAngle = this.currentAngle % (2 * Math.PI);

    // Ajustar si el ángulo inicial es más grande que el ángulo de alineación
    if (this.initialAngle > anguloAlineacion) {
      // Si el ángulo actual ya pasó el punto de alineación, sumamos una vuelta extra
      this.targetAngle += 2 * Math.PI;
    }

    // 4. INICIAR LA ANIMACIÓN
    // Usamos .bind(this) o arrow function para mantener el contexto
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  // --- Lógica de Animación ---
  // Utilizamos .bind(this) en requestAnimationFrame para forzar el contexto.
  animate(timestamp: number) {
    if (this.startTime === null) {
      this.startTime = timestamp;
    }

    const spinDuration = 5000; // 5 segundos de giro
    const progress = timestamp - this.startTime;

    if (progress < spinDuration) {
      var t = progress / spinDuration;

      // Función de easing (Ej: EaseOutQuint - desaceleración fuerte)
      const easeOut = 1 + --t * t * t * t * t;

      // Distancia a recorrer
      const angleDifference = this.targetAngle - this.initialAngle;

      // Actualiza el ángulo de la ruleta
      this.currentAngle = this.initialAngle + angleDifference * easeOut;

      this.drawWheel();
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    } else {
      // Garantizar que el ángulo final sea exactamente el objetivo
      this.currentAngle = this.targetAngle;
      this.drawWheel();
      this.stopSpin();
    }
  }

  // Función para generar el confeti
  private triggerConfetti(): void {
    const duration = 5 * 1000; // 5 segundos
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    // Función auxiliar para generar colores aleatorios
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // Bucle para disparar confeti repetidamente (efecto continuo)
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Disparo del confeti desde el lado izquierdo de la pantalla
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, // Origen más bajo
      });

      // Disparo del confeti desde el lado derecho de la pantalla
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250); // Se dispara cada 250ms
  }

  // --- Lógica de Parada ---
  stopSpin() {
    if (!this.animationId) return;

    // Detener el sonido de giro
    this.spinSound.pause();
    this.spinSound.currentTime = 0; // Reiniciar el sonido para la próxima vez

    this.isSpinning = false;
    this.spinBtn.disabled = false;
    cancelAnimationFrame(this.animationId);
    this.animationId = null;

    // Mostrar el resultado
    this.resultadoGanador = this.segments[this.indiceParadaFinal];

    this.resultText.textContent = this.resultadoGanador;
    if (this.resultadoGanador === PREMIO_GRANDE) {
      this.triggerConfetti();
      this.winSound.play();
    } else {
      this.loseSound.play();
    }
  }
}
