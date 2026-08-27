import { Component } from '@angular/core';
import { ListaPlaylists } from './components/lista-playlists/lista-playlists';
import { FormPlaylist } from './components/form-playlist/form-playlist';

@Component({
  selector: 'app-root',
  imports: [ListaPlaylists, FormPlaylist],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'playlist-frontend';
}
