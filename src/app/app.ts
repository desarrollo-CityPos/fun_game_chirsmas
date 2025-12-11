import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { cityPosLogoWhiteGreen } from '../assets/images-routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  cityPosLogoWhiteGreen: string = cityPosLogoWhiteGreen;

  title: string = 'Christmas Game';

  constructor() {}
}
