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
  mensagemSaindo = false;
  formularios: Record<string, Musica> = {};
  termoPesquisa: string = '';
  playlistSelecionada: Playlist | null = null;

  novoNome: string = '';
  novaDescricao: string = '';

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
      this.mensagemSaindo = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.message = '';
        this.messageType = '';
        this.mensagemSaindo = false;
        this.cdr.detectChanges();
      }, 350);
    }, 1500);
  }

  private sincronizarSelecao(): void {
    if (this.playlistSelecionada) {
      this.playlistSelecionada =
        this.playlists.find((p) => p.nome === this.playlistSelecionada!.nome) ?? null;
    }
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
        this.sincronizarSelecao();
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

  pesquisar(): void {
    this.playlistService.listarTodas(this.termoPesquisa).subscribe({
      next: (dados) => {
        this.playlists = dados;
        this.playlists.forEach((playlist) => {
          if (!this.formularios[playlist.nome]) {
            this.formularios[playlist.nome] = this.musicaVazia();
          }
        });
        this.sincronizarSelecao();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = 'Erro ao pesquisar.';
        this.messageType = 'error';
        console.error(err);
        this.cdr.detectChanges();
      },
    });
  }

  selecionarPlaylist(playlist: Playlist): void {
    this.playlistSelecionada = playlist;
  }

  criarPlaylist(): void {
    const nova: Playlist = {
      nome: this.novoNome,
      descrição: this.novaDescricao,
      músicas: [],
    };

    this.playlistService.criarPlaylist(nova).subscribe({
      next: () => {
        this.message = 'Playlist criada com sucesso!';
        this.messageType = 'success';
        this.novoNome = '';
        this.novaDescricao = '';
        this.limparMensagem();
        this.carregarPlaylists();
      },
      error: (err) => {
        this.message = err.error || 'Erro ao criar playlist.';
        this.messageType = 'error';
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
        this.playlistSelecionada = null;
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
