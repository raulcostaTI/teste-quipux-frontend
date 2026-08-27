export interface Musica {
  id?: number;
  titulo: string;
  artista: string;
  album: string;
  ano: string;
  genero: string;
}

export interface Playlist {
  id?: number;
  nome: string;
  descrição: string;
  músicas: Musica[];
}
