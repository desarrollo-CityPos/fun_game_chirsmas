import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { audioBackground, background, cityPosLogoWhiteGreen } from '../assets/assets-routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  cityPosLogoWhiteGreen: string = cityPosLogoWhiteGreen;
  background: string = background;

  title: string = 'Christmas Game';
  // --- PROPIEDADES DE AUDIO ---
  private backgroundSound!: HTMLAudioElement;

  constructor() {}

  ngAfterViewInit(): void {
    // --- 1. CARGAR LOS ARCHIVOS DE AUDIO ---
    this.backgroundSound = new Audio(audioBackground);

    // Configuración: El sonido de giro debe ser loopeable y tener menor volumen
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.02; // Ajustar volumen para que no sea muy fuerte
  }

  playBackgroundSound() {
    // Intentar reproducir. La reproducción automática puede fallar
    // si el usuario no ha interactuado antes con la página.
    this.backgroundSound.play().catch((error) => {
      console.log('No se pudo iniciar la reproducción automática del sonido de fondo.');
    });
  }
}
