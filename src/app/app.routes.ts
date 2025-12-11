import { ChirstmasTree } from './modules/chirstmas-tree/chirstmas-tree';
import { Routes } from '@angular/router';
import { Base } from './modules/base/base';
import { Roulette } from './modules/roulette/roulette';
import { Quiz } from './modules/quiz/quiz';

export const routes: Routes = [
  {
    path: '',
    component: Base,
  },
  {
    path: 'roulette',
    component: Roulette,
  },
  {
    path: 'quiz',
    component: Quiz,
  },
  {
    path: 'chirstmas_tree',
    component: ChirstmasTree,
  },
];
