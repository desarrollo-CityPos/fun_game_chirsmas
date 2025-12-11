import { Component } from '@angular/core';

@Component({
  selector: 'app-roulette',
  imports: [],
  templateUrl: './roulette.html',
  styleUrl: './roulette.css',
})
export class Roulette {

  // --- Configuration & State ---
  const canvas = document.getElementById('wheelCanvas') as HTMLCanvasElement;
  const ctx = this.canvas?.getContext('2d');
  const spinBtn = document.getElementById('spinBtn') as HTMLButtonElement;
  const prizesInput = document.getElementById('prizesInput') as HTMLTextAreaElement;
  const updateBtn = document.getElementById('updateBtn');
  const winnerModal = document.getElementById('winnerModal');
  const winnerText = document.getElementById('winnerText');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalContent = document.getElementById('modalContent');

  // Default Prizes
  const segments = [
      "5% Descuento",
      "Intenta de nuevo",
      "Envío Gratis",
      "Premio Sorpresa",
      "10% Descuento",
      "Sin Premio",
      "2x1 en Tienda",
      "Regalo Especial"
  ];

  // Colors Palette (Festive & Clean)
  colors = [
      '#FF6B6B', // Red
      '#4ECDC4', // Teal
      '#45B7D1', // Blue
      '#96CEB4', // Green
      '#FFEEAD', // Yellow/Cream
      '#D4A5A5', // Dusty Pink
      '#9B59B6', // Purple
      '#3498DB'  // Blue Dark
  ];

  currentAngle = 0;
  isSpinning = false;
  spinVelocity = 0;
  animationId = null;

  // --- Initialization ---
  init() {
    // Set input value
    this.prizesInput!.value = this.segments.join('\n');
    this.drawWheel();
  }

  // --- Core Drawing Logic ---
  drawWheel() {
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const radius = this.canvas.width / 2 - 10; // Padding
      const arcSize = (2 * Math.PI) / this.segments.length;

      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw this.segments
      this.segments.forEach((segment, index) => {
          const angle = this.currentAngle + index * arcSize;

          this.ctx?.beginPath();
          this.ctx?.moveTo(centerX, centerY);
          this.ctx?.arc(centerX, centerY, radius, angle, angle + arcSize);
          this.ctx?.closePath();

          this.ctx!.fillStyle = this.colors[index % this.colors.length];
          this.ctx?.fill();
          this.ctx?.stroke();

          // Draw Text
          this.ctx?.save();
          this.ctx?.translate(centerX, centerY);
          this.ctx?.rotate(angle + arcSize / 2);
          this.ctx!.textAlign = "right";
          this.ctx!.fillStyle = "#fff";

          // Adjust font size based on text length and segment count
          const fontSize = Math.max(14, 24 - (this.segments.length));
          this.ctx!.font = `bold ${fontSize}px Fredoka`;

          // Text Shadow for contrast
          this.ctx!.shadowColor = "rgba(0,0,0,0.3)";
          this.ctx!.shadowBlur = 4;
          this.ctx!.shadowOffsetX = 1;
          this.ctx!.shadowOffsetY = 1;

          this.ctx?.fillText(segment, radius - 20, 5);
          this.ctx?.restore();
      });
  }

  // --- Spin Logic ---
  spin() {
      if (this.isSpinning) return;

      // Check if enough this.segments
      if (this.segments.length < 2) {
          alert("Por favor agrega al menos 2 premios.");
          return;
      }

      this.isSpinning = true;
      this.spinBtn!.disabled = true;

      // Random spin duration and velocity
      const spinDuration = 3000 + Math.random() * 2000; // 3-5 seconds
      const initialVelocity = 0.5 + Math.random() * 0.5; // rad/frame

      let startTime = null;

      animate(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;

          if (progress < spinDuration) {
              // Ease out circ formula for deceleration
              const t = progress / spinDuration;
              const easeOut = 1 - Math.sqrt(1 - Math.pow(t - 1, 2)); // Custom ease

              // Rotate
              // We reduce velocity over time
              const currentVelocity = initialVelocity * (1 - (progress / spinDuration));
              currentAngle += currentVelocity;

              drawWheel();
              animationId = requestAnimationFrame(animate);
          } else {
              stopSpin();
          }
      }

      requestAnimationFrame(animate);
  }

  stopSpin() {
      isSpinning = false;
      spinBtn.disabled = false;
      cancelAnimationFrame(animationId);

      // Normalize angle
      const twoPI = 2 * Math.PI;
      const normalizedAngle = currentAngle % twoPI;

      // Calculate winner
      // The pointer is at 0 (Right side).
      // Wheel rotates clockwise, so indices move counter-clockwise past the pointer.
      const arcSize = twoPI / this.segments.length;

      // We need to find which segment overlaps 0 radians (Right side)
      // Or effectively, calculate index based on rotation.
      // Formula: (Total this.segments - (Angle / ArcSize)) % Total this.segments

      const winningIndex = Math.floor(this.segments.length - (normalizedAngle / arcSize)) % this.segments.length;

      // Handle potentially negative modulo results (though math.floor usually handles it)
      const safeIndex = (winningIndex + this.segments.length) % this.segments.length;

      showWinner(this.segments[safeIndex]);
  }

  // --- Winner UI & Confetti ---
  showWinner(prize) {
      this.winnerText!.textContent = prize;
      this.winnerModal?.classList.remove('hidden');
      // Trigger reflow for transition
      void this.winnerModal?.offsetWidth;
      this.winnerModal?.classList.remove('opacity-0');
      modalContent.classList.remove('scale-90');
      modalContent.classList.add('scale-100');

      fireConfetti();
  }

  closeWinnerModal() {
      this.winnerModal?.classList.add('opacity-0');
      modalContent.classList.remove('scale-100');
      modalContent.classList.add('scale-90');

      setTimeout(() => {
          this.winnerModal?.classList.add('hidden');
      }, 300);
  }

  fireConfetti() {
      const count = 150;
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

      for (let i = 0; i < count; i++) {
          const conf = document.createElement('div');
          conf.classList.add('confetti');

          // Random properties
          conf.style.left = Math.random() * 100 + 'vw';
          conf.style.top = -10 + 'px';
          conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          conf.style.animationDuration = (Math.random() * 2 + 2) + 's';
          conf.style.opacity = Math.random();
          conf.style.transform = rotate(${Math.random() * 360}deg);

          document.body.appendChild(conf);

          // Cleanup
          setTimeout(() => {
              conf.remove();
          }, 4000);
      }
  }

  // --- Event Listeners ---
  spinBtn.addEventListener('click', spin);

  updateBtn.addEventListener('click', () => {
      if (isSpinning) return;
      const text = prizesInput.value.trim();
      if (!text) return;

      const newthis.segments = text.split('\n').filter(line => line.trim() !== "");
      if (newthis.segments.length > 0) {
          this.segments = newthis.segments;
          currentAngle = 0; // Reset angle
          drawWheel();

          // Button feedback
          const originalText = updateBtn.innerHTML;
          updateBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Actualizado!';
          setTimeout(() => updateBtn.innerHTML = originalText, 2000);
      }
  });

  closeModalBtn.addEventListener('click', closeWinnerModal);

  // Close on background click
  winnerModal.addEventListener('click', (e) => {
      if (e.target === winnerModal) closeWinnerModal();
  });


}

