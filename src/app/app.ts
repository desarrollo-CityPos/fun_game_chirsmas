import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { background, cityPosLogoWhiteGreen } from '../assets/images-routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  cityPosLogoWhiteGreen: string = cityPosLogoWhiteGreen;
  background: string = background;

  title: string = 'Christmas Game';

  constructor() {}
}
