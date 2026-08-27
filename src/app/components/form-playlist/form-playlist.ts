import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mensagem } from '../mensagem/mensagem';
import { PlaylistService } from '../../services/playlist';
import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-form-playlist',
  imports: [FormsModule, Mensagem],
  templateUrl: './form-playlist.html',
  styleUrl: './form-playlist.css',
})
export class FormPlaylist {
  nome: string = '';
  descricao: string = '';
  erro: string = '';
  sucesso: string = '';
  private timeoutMensagem?: ReturnType<typeof setTimeout>;

  @Output() playlistCriada = new EventEmitter<void>();

  constructor(
    private readonly playlistService: PlaylistService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  private limparMensagem(): void {
    if (this.timeoutMensagem) {
      clearTimeout(this.timeoutMensagem);
    }

    this.timeoutMensagem = setTimeout(() => {
      this.sucesso = '';
      this.erro = '';
      this.cdr.detectChanges();
    }, 1000);
  }

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
        this.limparMensagem();
      },
      error: (err) => {
        this.erro = err.error || 'Erro ao criar playlist.';
        this.sucesso = '';
        this.limparMensagem();
      },
    });
  }
}
