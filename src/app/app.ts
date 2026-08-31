import { Component } from '@angular/core';
import { ListaPlaylists } from './components/lista-playlists/lista-playlists';

@Component({
  selector: 'app-root',
  imports: [ListaPlaylists],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'playlist-frontend';
}
