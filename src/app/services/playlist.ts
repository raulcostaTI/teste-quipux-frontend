import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist, Musica } from '../models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'http://localhost:8080/lists';

  private headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa('quipux.admin:123456'),
  });

  constructor(private http: HttpClient) {}

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

  // adiciona uma música a uma playlist existente
  adicionarMusica(nomePlaylist: string, musica: Musica): Observable<Playlist> {
    const url = `${this.apiUrl}/${encodeURIComponent(nomePlaylist)}/musicas`;
    return this.http.post<Playlist>(url, musica, { headers: this.headers });
  }

  // remove uma música específica de uma playlist
  removerMusica(nomePlaylist: string, musicaId: number): Observable<Playlist> {
    const url = `${this.apiUrl}/${encodeURIComponent(nomePlaylist)}/musicas/${musicaId}`;
    return this.http.delete<Playlist>(url, { headers: this.headers });
  }
}
