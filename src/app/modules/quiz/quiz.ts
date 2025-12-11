import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.services';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  question: string = '';

  constructor(public quizService: QuizService) {}
}
