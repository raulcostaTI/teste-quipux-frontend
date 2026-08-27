import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  templateUrl: './mensagem.html',
  styleUrl: './mensagem.css',
})
export class Mensagem {
  @Input() tipo: 'success' | 'error' = 'success';
}
