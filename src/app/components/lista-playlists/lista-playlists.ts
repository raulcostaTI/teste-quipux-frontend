import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mensagem } from '../mensagem/mensagem';
import { PlaylistService } from '../../services/playlist';
import { Musica, Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-lista-playlists',
  imports: [CommonModule, FormsModule, Mensagem],
  templateUrl: './lista-playlists.html',
  styleUrl: './lista-playlists.css',
})
export class ListaPlaylists implements OnInit {
  playlists: Playlist[] = [];
  message = '';
  messageType: 'success' | 'error' | '' = '';
  formularios: Record<string, Musica> = {};
  private timeoutMensagem?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly playlistService: PlaylistService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarPlaylists();
  }

  private limparMensagem(): void {
    if (this.timeoutMensagem) {
      clearTimeout(this.timeoutMensagem);
    }

    this.timeoutMensagem = setTimeout(() => {
      this.message = '';
      this.messageType = '';
      this.cdr.detectChanges();
    }, 1000);
  }

  carregarPlaylists(): void {
    this.playlistService.listarTodas().subscribe({
      next: (dados) => {
        this.playlists = dados;
        this.playlists.forEach((playlist) => {
          if (!this.formularios[playlist.nome]) {
            this.formularios[playlist.nome] = this.musicaVazia();
          }
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = 'Erro ao carregar playlists.';
        this.messageType = 'error';
        console.error(err);
        this.limparMensagem();
        this.cdr.detectChanges();
      },
    });
  }

  adicionarMusica(nomePlaylist: string): void {
    const musica = this.formularios[nomePlaylist];
    this.playlistService.adicionarMusica(nomePlaylist, musica).subscribe({
      next: () => {
        this.formularios[nomePlaylist] = this.musicaVazia();
        this.message = 'Música adicionada com sucesso!';
        this.messageType = 'success';
        this.limparMensagem();
        this.carregarPlaylists();
      },
      error: (err) => {
        this.message = err.error || 'Erro ao adicionar música.';
        this.messageType = 'error';
        this.limparMensagem();
        this.cdr.detectChanges();
      },
    });
  }

  removerMusica(nomePlaylist: string, musicaId: number | undefined): void {
    if (musicaId === undefined) {
      return;
    }

    this.playlistService.removerMusica(nomePlaylist, musicaId).subscribe({
      next: () => {
        this.message = 'Música removida com sucesso!';
        this.messageType = 'success';
        this.limparMensagem();
        this.carregarPlaylists();
      },
      error: (err) => {
        this.message = err.error || 'Erro ao remover música.';
        this.messageType = 'error';
        this.limparMensagem();
        this.cdr.detectChanges();
      },
    });
  }

  apagar(nome: string): void {
    this.playlistService.deletarPorNome(nome).subscribe({
      next: () => {
        this.message = 'Playlist deletada com sucesso!';
        this.messageType = 'success';
        this.limparMensagem();
        this.carregarPlaylists();
      },
      error: (err) => {
        this.message = 'Erro ao deletar playlist.';
        this.messageType = 'error';
        console.error(err);
        this.limparMensagem();
        this.cdr.detectChanges();
      },
    });
  }

  private musicaVazia(): Musica {
    return { titulo: '', artista: '', album: '', ano: '', genero: '' };
  }
}
