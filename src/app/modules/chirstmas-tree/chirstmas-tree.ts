import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, computed, QueryList, signal, ViewChildren } from '@angular/core';
import confetti from 'canvas-confetti';
import { chirstmasTree, decorationChirstmas, snowLandscape } from 'src/assets/images-routes';

@Component({
  selector: 'app-chirstmas-tree',
  imports: [CdkDrag],
  templateUrl: './chirstmas-tree.html',
  styleUrl: './chirstmas-tree.css',
})
export class ChirstmasTree {
  // Imágenes
  decorationChirstmas: string[] = decorationChirstmas;
  snowLandscape: string = snowLandscape;
  chirstmasTree: string = chirstmasTree;

  totalDecration: number = this.decorationChirstmas.length * 2 - 1;

  readonly total = 30;

  youWon = signal(false);
  gameOver = signal(false);

  timerId: any;

  readonly secondsRemaining = signal(this.total);

  readonly record = computed(() => this.secondsRemaining() - this.total);

  readonly formattedRemaining = computed(() => this.formattedTime(this.secondsRemaining()));

  constructor() {}

  // Arreglo de decoraciones puestas en el arbol
  decorationsDropped: string[] = [];

  // Referencia a todos los componentes CdkDrag en la vista
  @ViewChildren(CdkDrag) draggableItems!: QueryList<CdkDrag>;

  droped(id: string): void {
    if (!this.decorationsDropped.includes(id)) {
      this.decorationsDropped.push(id);
      console.log('Se solto', this.decorationsDropped);
    }

    if (this.secondsRemaining() == this.total) this.iniciar();
  }

  iniciar(): void {
    if (this.timerId == null)
      this.timerId = setInterval(() => {
        if (this.secondsRemaining() > 0 && this.decorationsDropped.length < this.totalDecration) {
          this.secondsRemaining.update((v) => Math.max(v - 1, 0));
        } else {
          this.stop();
        }
      }, 1000);
  }

  stop(): void {
    clearInterval(this.timerId);
    this.timerId = null;
    this.gameOver.set(true);

    if (this.secondsRemaining() > 0) {
      this.triggerConfetti();
      this.youWon.set(true);
    } else {
      this.youWon.set(false);
    }
  }

  reset(): void {
    this.resetAllPositions();
    clearInterval(this.timerId);
    this.timerId = null;
    this.youWon.set(false);
    this.gameOver.set(false);
    this.secondsRemaining.set(this.total);
    this.decorationsDropped = [];
  }

  resetAllPositions() {
    this.draggableItems.forEach((dragItem: CdkDrag) => {
      // **¡La clave está aquí!** Llama a reset() para moverlo a su posición inicial.
      dragItem.reset();
    });
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

  private formattedTime(totalSeconds: number): string {
    return new Date(totalSeconds * 1000).toISOString().slice(14, 19);
  }
}
