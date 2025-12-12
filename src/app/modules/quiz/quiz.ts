import { Component, computed, signal } from '@angular/core';
import confetti from 'canvas-confetti';
import { QuizService } from 'src/app/services/quiz.services';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  showAnswer = signal(false);

  youWon = signal(false);

  gameOver = signal(false);

  question: string = '';

  answer: string = '';

  constructor(public quizService: QuizService) {}

  readonly total = 30;

  timerId: any;

  readonly secondsRemaining = signal(this.total);

  readonly record = computed(() => this.secondsRemaining() - this.total);

  readonly formattedRemaining = computed(() => this.formattedTime(this.secondsRemaining()));

  congratulationsMessage: string[] = [
    'Conoces la empresa como un verdadero experto.',
    'Tu conocimiento está a otro nivel.',
    'Vas directo al top de la empresa.',
    'Te ganaste un punto extra de orgullo corporativo.',
    'Has demostrado un gran conocimiento institucional.',
    'Muy bien. Representas los valores de la empresa.',
    'Tu dominio del tema es impecable.',
    'Vas directo al top de la empresa.',
    'Eres el héroe de esta ronda.',
    'Otro logro desbloqueado.',
    'Tu espíritu empresarial está al máximo.',
    'Respuesta acertada. Continúa así.',
    'Santa te daría un ascenso navideño.',
  ];

  failMessage: string[] = [
    'Casi… sigue intentando, vas muy bien.',
    '¡Uy! Esa no era, pero no te rindas.',
    'No fue la correcta, pero estás cerca.',
    'No fue la correcta, pero tu espíritu sigue en juego.',
    'Incorrecto, pero Santa cree en ti.',
  ];

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion(): void {
    if (!this.quizService.listQuestions().length) this.quizService.resetQuiz();

    this.showAnswer.set(false);
    this.youWon.set(false);
    this.gameOver.set(false);
    const question = this.quizService.getRandomQuestion();
    this.question = question.question;
    this.answer = question.answer;

    console.log('Pregunta numero:', question.id);
    console.log('Eliminados:', this.quizService.questionsDeleted.length);
    console.log('Restantes:', this.quizService.listQuestions().length);
  }

  resetQuiz(): void {
    this.quizService.resetQuiz();
    this.getQuestion();
  }

  iniciar(): void {
    if (this.timerId == null)
      this.timerId = setInterval(() => {
        if (this.secondsRemaining() > 0) {
          this.secondsRemaining.update((v) => Math.max(v - 1, 0));
        } else {
          this.stop();
        }
      }, 1000);
  }

  stop(): void {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  showModel(value: boolean): void {
    this.gameOver.set(true);
    this.youWon.set(value);
    if (value) {
      this.triggerConfetti();
    }
  }

  reset(): void {
    this.quizService.resetQuiz();
    this.getQuestion();
    this.timerId = null;
    this.youWon.set(false);
    this.gameOver.set(false);
    this.secondsRemaining.set(this.total);
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

  getRandomMessage(items: string[]): string {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }
}
