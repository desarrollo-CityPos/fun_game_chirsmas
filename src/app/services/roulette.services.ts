import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RulettteService {
  private PROBABILIDAD_ESPECIAL = 30; // 1 de 10

  /**
   * Determina el índice de parada final basado en la probabilidad de 1/10.
   * @param totalSegments Debe ser 10
   * @param indiceGanadorEspecial El índice del premio 1/10 (ej: 0)
   * @returns El índice final de parada.
   */
  public determinarIndiceParada(totalSegments: number, indiceGanadorEspecial: number): number {
    console.log(this.PROBABILIDAD_ESPECIAL);

    // Genera un número aleatorio entre 1 y 10.
    const sorteo = Math.floor(Math.random() * this.PROBABILIDAD_ESPECIAL) + 1;

    if (sorteo === 1) {
      this.PROBABILIDAD_ESPECIAL = 30;
      // La tirada es ganadora (1/10)
      return indiceGanadorEspecial; // Detener en el sector 0 (Premio Grande)
    } else {
      this.PROBABILIDAD_ESPECIAL--;
      // La tirada es perdedora o de consuelo (39/10)
      let indicePerdedor: number;
      do {
        // Genera un índice aleatorio en CUALQUIERA de los 10 sectores
        indicePerdedor = Math.floor(Math.random() * totalSegments);
      } while (indicePerdedor === indiceGanadorEspecial); // Asegurarse de que NO caiga en el premio especial

      return indicePerdedor;
    }
  }
}
