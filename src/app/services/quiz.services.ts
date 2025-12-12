import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public questions: {
    question: string;
    id: number;
    answer: string;
  }[] = [
    {
      question: 'cual es el nombre que mas repite por los pasillos',
      id: 1,
      answer: 'bastidas!',
    },
    {
      question: 'quien se toma todo el café de la oficina',
      id: 2,
      answer: 'luzneida',
    },
    {
      question: 'qué hacer en caso de comercio invalido',
      id: 3,
      answer: 'reenvío de plantilla',
    },
    {
      question: 'qué elemento es vital para sobrevivir al cierre de mes',
      id: 4,
      answer: 'música de wisin y yandel',
    },
    {
      question: 'con cuantos terminales activos contamos actualmente',
      id: 5,
      answer: '3848',
    },
    {
      question: 'qué hacer en caso de mercurio en retrógrado',
      id: 6,
      answer: 'imprimir estrellas de 5 puntas',
    },
    {
      question: 'mes con más ventas',
      id: 7,
      answer: 'octubre',
    },
    {
      question: 'qué frase es la más temida un viernes a las 4:55 pm',
      id: 8,
      answer: 'tenemos que hablar',
    },
    {
      question: 'récord de ventas mensual',
      id: 9,
      answer: '442',
    },
    {
      question: 'cual es las marca de nuestro equipo g25',
      id: 10,
      answer: 'nexgo',
    },
    {
      question: 'cual es empleado que nunca descansa',
      id: 11,
      answer: 'catypos',
    },
    {
      question: 'frase más repetida en el departamento de marketing',
      id: 12,
      answer: 'y christian?',
    },
    {
      question: 'cual es le rif de citypos',
      id: 13,
      answer: '408818680',
    },
    {
      question: 'el peinado mejor mantenido en lo que va de año',
      id: 14,
      answer: 'lenin',
    },
    {
      question: 'visión de citypos',
      id: 15,
      answer: 'ser la empresa líder en punto de ventas con su excelente servicio de postventa',
    },
    {
      question: 'cuantos equipos ofrecen la función contaless',
      id: 16,
      answer: '14',
    },
    {
      question: 'cual es nuestro equipo más moderno',
      id: 17,
      answer: 'n86',
    },
    {
      question: 'el estado con mayor presencia de citypos',
      id: 18,
      answer: 'zulia 551',
    },
    {
      question: 'mayor venta de este año',
      id: 19,
      answer: '15',
    },
    {
      question: 'nuestro equipo mas vendido en lo que va de año',
      id: 20,
      answer: 'n82',
    },
    {
      question: 'no es un cierre de mes efectivo si no pasamos la información a:',
      id: 21,
      answer: 'oriana',
    },
    {
      question: 'total de tickets cerrados en heldesk',
      id: 22,
      answer: '1275',
    },
    {
      question: 'mejor café del mundo',
      id: 23,
      answer: 'toraldo',
    },
    {
      question: 'total de seguidores en instagram',
      id: 24,
      answer: '11,1 mil',
    },
    {
      question: 'que significa codigo 51',
      id: 25,
      answer: 'fondos insuficientes',
    },
    {
      question: 'banco con mayor clientela',
      id: 26,
      answer: 'banco de venezuela',
    },
    {
      question: 'nuestro mayor cliente',
      id: 27,
      answer: 'sumi pan',
    },
    {
      question: 'quién acumula más tazas sucias en su escritorio',
      id: 28,
      answer: 'jose guaina',
    },
    {
      question: 'ciudad con el cliente más lejano',
      id: 29,
      answer: 'santa elena de uairén',
    },
    {
      question: 'qué hacer si el cliente dice que el punto no enciende',
      id: 30,
      answer: 'preguntar si lo enchufó',
    },
    {
      question: 'banco con la aprobación más rápida',
      id: 31,
      answer: 'tesoro',
    },
    {
      question: 'modelo de punto de venta más resistente a caídas',
      id: 32,
      answer: 'n86',
    },
    {
      question: 'cantidad de rollos de papel gastados al mes',
      id: 33,
      answer: '40',
    },
    {
      question: 'en que dia mes y año asumió la nueva gerencia de citypos',
      id: 34,
      answer: '1 noviembre del 2024',
    },
    {
      question: 'apellido de la señora derua',
      id: 35,
      answer: 'torrez',
    },
    {
      question: 'cual es la oficina regional recién inaugurada',
      id: 36,
      answer: 'barinas',
    },
    {
      question: 'cual es la oficina próxima a estrenar',
      id: 37,
      answer: 'maracaibo',
    },
    {
      question: 'en que fecha comenzó a operar city pos',
      id: 38,
      answer: '1 de julio del 2021',
    },
    {
      question: 'cual es numero en el menú de la central para llamar a administración',
      id: 39,
      answer: 'opcion 7',
    },
  ];

  questionsDeleted: {
    question: string;
    id: number;
    answer: string;
  }[] = [];

  listQuestions = signal(this.questions);

  constructor() {}

  getRandomQuestion(): {
    question: string;
    id: number;
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
