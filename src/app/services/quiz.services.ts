import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public questions: {
    question: string;
    options: string[];
    answer: string;
  }[] = [
    {
      question: 'cual es el nombre que mas repite por los pasillos',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'bastidas!',
    },
    {
      question: 'quien se toma todo el café de la oficina',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'luzneida',
    },
    {
      question: 'qué hacer en caso de comercio invalido',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'reenvío de plantilla',
    },
    {
      question: 'qué elemento es vital para sobrevivir al cierre de mes',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'música de wisin y yandel',
    },
    {
      question: 'con cuantos terminales activos contamos actualmente',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '3848',
    },
    {
      question: 'qué hacer en caso de mercurio en retrógrado',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'imprimir estrellas de 5 puntas',
    },
    {
      question: 'mes con más ventas',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'octubre',
    },
    {
      question: 'qué frase es la más temida un viernes a las 4:55 pm',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'tenemos que hablar',
    },
    {
      question: 'récord de ventas mensual',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '442',
    },
    {
      question: 'cual es las marca de nuestro equipo g25',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'nexgo',
    },
    {
      question: 'cual es empleado que nunca descansa',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'catypos',
    },
    {
      question: 'frase más repetida en el departamento de marketing',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'y christian?',
    },
    {
      question: 'cual es le rif de citypos',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '408818680',
    },
    {
      question: 'el peinado mejor mantenido en lo que va de año',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'lenin',
    },
    {
      question: 'visión de citypos',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'ser la empresa líder en punto de ventas con su excelente servicio de postventa',
    },
    {
      question: 'cuantos equipos ofrecen la función contaless',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '14',
    },
    {
      question: 'cual es nuestro equipo más moderno',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'n86',
    },
    {
      question: 'el estado con mayor presencia de citypos',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'zulia 551',
    },
    {
      question: 'mayor venta de este año',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '15',
    },
    {
      question: 'nuestro equipo mas vendido en lo que va de año',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'n82',
    },
    {
      question: 'no es un cierre de mes efectivo si no pasamos la información a:',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'oriana',
    },
    {
      question: 'total de tickets cerrados en heldesk',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '1275',
    },
    {
      question: 'mejor café del mundo',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'toraldo',
    },
    {
      question: 'total de seguidores en instagram',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '11,1 mil',
    },
    {
      question: 'que significa codigo 51',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'fondos insuficientes',
    },
    {
      question: 'banco con mayor clientela',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'banco de venezuela',
    },
    {
      question: 'nuestro mayor cliente',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'sumi pan',
    },
    {
      question: 'quién acumula más tazas sucias en su escritorio',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'jose guaina',
    },
    {
      question: 'ciudad con el cliente más lejano',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'santa elena de uairén',
    },
    {
      question: 'qué hacer si el cliente dice que el punto no enciende',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'preguntar si lo enchufó',
    },
    {
      question: 'banco con la aprobación más rápida',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'tesoro',
    },
    {
      question: 'modelo de punto de venta más resistente a caídas',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'n86',
    },
    {
      question: 'cantidad de rollos de papel gastados al mes',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '40',
    },
    {
      question: 'en que dia mes y año asumió la nueva gerencia de citypos',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '1 noviembre del 2024',
    },
    {
      question: 'apellido de la señora derua',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'torrez',
    },
    {
      question: 'cual es la oficina regional recién inaugurada',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'barinas',
    },
    {
      question: 'cual es la oficina próxima a estrenar',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'maracaibo',
    },
    {
      question: 'en que fecha comenzó a operar city pos',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: '1 de julio del 2021',
    },
    {
      question: 'cual es numero en el menú de la central para llamar a administración',
      options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
      answer: 'opcion 7',
    },
  ];

  questionsDeleted: {
    question: string;
    options: string[];
    answer: string;
  }[] = [];

  listQuestions = signal(this.questions);

  constructor() {}

  getRandomQuestion(): {
    question: string;
    options: string[];
    answer: string;
  } {
    const randomIndex = Math.floor(Math.random() * this.listQuestions().length);

    this.questionsDeleted.push(this.listQuestions()[randomIndex]);

    return this.listQuestions().splice(randomIndex, 1)[0];
  }

  resetQuiz(): void {
    this.listQuestions.update((questions) => [...questions, ...this.questionsDeleted]);
    this.questionsDeleted = [];
  }
}
