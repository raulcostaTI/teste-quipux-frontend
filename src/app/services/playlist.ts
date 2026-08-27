import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Musica, Playlist } from '../models/playlist.model';
@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly apiUrl = 'http://localhost:8080/lists';

  private readonly headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa('quipux.admin:123456'),
  });

  constructor(private readonly http: HttpClient) {}

  criarPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, playlist, { headers: this.headers });
  }

  listarTodas(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl, { headers: this.headers });
  }

  buscarPorNome(nome: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiUrl}/${encodeURIComponent(nome)}`, {
      headers: this.headers,
    });
  }

  deletarPorNome(nome: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${encodeURIComponent(nome)}`, {
      headers: this.headers,
    });
  }

  adicionarMusica(nomePlaylist: string, musica: Musica): Observable<Playlist> {
    return this.http.post<Playlist>(
      `${this.apiUrl}/${encodeURIComponent(nomePlaylist)}/musicas`,
      musica,
      { headers: this.headers },
    );
  }
}
