import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist';
import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-lista-playlists',
  imports: [CommonModule],
  templateUrl: './lista-playlists.html',
  styleUrl: './lista-playlists.css',
})
export class ListaPlaylists implements OnInit {
  playlists: Playlist[] = [];
  erro: string = '';

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
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erro = 'Erro ao carregar playlists.';
        console.error(err);
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
}
