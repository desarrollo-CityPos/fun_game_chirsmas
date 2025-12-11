import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [RouterLink],
  templateUrl: './base.html',
  styleUrl: './base.css',
})
export class Base {}
