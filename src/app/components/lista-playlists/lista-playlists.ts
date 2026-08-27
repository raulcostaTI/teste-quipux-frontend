import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist';
import { Musica, Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-lista-playlists',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-playlists.html',
  styleUrl: './lista-playlists.css',
})
export class ListaPlaylists implements OnInit {
  playlists: Playlist[] = [];
  erro: string = '';
  formularios: Record<string, Musica> = {};

  constructor(
    private playlistService: PlaylistService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarPlaylists();
  }

  carregarPlaylists(): void {
    this.playlistService.listarTodas().subscribe({
      next: (dados) => {
        this.playlists = dados;
        this.erro = '';
        this.playlists.forEach((playlist) => {
          if (!this.formularios[playlist.nome]) {
            this.formularios[playlist.nome] = this.musicaVazia();
          }
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erro = 'Erro ao carregar playlists.';
        console.error(err);
        this.cdr.detectChanges();
      },
    });
  }

  adicionarMusica(nomePlaylist: string): void {
    const musica = this.formularios[nomePlaylist];
    this.playlistService.adicionarMusica(nomePlaylist, musica).subscribe({
      next: () => {
        this.formularios[nomePlaylist] = this.musicaVazia();
        this.carregarPlaylists();
      },
      error: (err) => {
        this.erro = err.error || 'Erro ao adicionar música.';
        this.cdr.detectChanges();
      },
    });
  }

  apagar(nome: string): void {
    this.playlistService.deletarPorNome(nome).subscribe({
      next: () => {
        this.carregarPlaylists();
      },
      error: (err) => {
        this.erro = 'Erro ao apagar playlist.';
        console.error(err);
        this.cdr.detectChanges();
      },
    });
  }

  private musicaVazia(): Musica {
    return { titulo: '', artista: '', album: '', ano: '', genero: '' };
  }
}
