import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist';
import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-form-playlist',
  imports: [FormsModule],
  templateUrl: './form-playlist.html',
  styleUrl: './form-playlist.css',
})
export class FormPlaylist {
  nome: string = '';
  descricao: string = '';
  erro: string = '';
  sucesso: string = '';

  @Output() playlistCriada = new EventEmitter<void>();

  constructor(private playlistService: PlaylistService) {}

  criar(): void {
    const novaPlaylist: Playlist = {
      nome: this.nome,
      descrição: this.descricao,
      músicas: [],
    };

    this.playlistService.criarPlaylist(novaPlaylist).subscribe({
      next: () => {
        this.sucesso = 'Playlist criada com sucesso!';
        this.erro = '';
        this.nome = '';
        this.descricao = '';
        this.playlistCriada.emit();
      },
      error: (err) => {
        this.erro = err.error || 'Erro ao criar playlist.';
        this.sucesso = '';
      },
    });
  }
}
