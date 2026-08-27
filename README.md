# Playlist Frontend

Aplicação Angular para gerenciamento de playlists musicais: criação e exclusão de playlists, além da inclusão de músicas em cada uma delas. O frontend consome uma API REST (backend Spring Boot + H2, executado separadamente) para persistir os dados.

## Stack

- [Angular 22](https://angular.dev/) (standalone components, sem NgModules)
- Angular zoneless (sem `zone.js` — atualizações de view fora de bindings automáticos exigem `ChangeDetectorRef.detectChanges()` manual)
- TypeScript 6
- RxJS
- [Vitest](https://vitest.dev/) para testes unitários

## Pré-requisitos

- Node.js compatível com Angular 22
- npm (o projeto fixa `packageManager: npm@11.19.0`)
- Backend da API rodando (ver [Configuração da API](#configuração-da-api))

## Instalação

```bash
npm install
```

## Configuração da API

A URL base da API é definida diretamente em [`src/app/services/playlist.ts`](src/app/services/playlist.ts):

```ts
private readonly apiUrl = 'http://localhost:8080/lists';
```

Ajuste esse valor para apontar para o backend correto antes de rodar a aplicação. As requisições enviam autenticação HTTP Basic fixa (`quipux.admin`) definida no mesmo arquivo.

## Rodando em desenvolvimento

```bash
npm start
```

Abra `http://localhost:4200/` no navegador. A aplicação recarrega automaticamente a cada alteração nos arquivos-fonte.

## Build

```bash
npm run build
```

Os artefatos de build são gerados em `dist/`.

## Testes

```bash
npm test
```

Executa os testes unitários com Vitest.

## Estrutura do projeto

```text
src/app/
├── components/
│   ├── form-playlist/     # Formulário de criação de playlist
│   ├── lista-playlists/   # Listagem, exclusão de playlists e inclusão de músicas
│   └── mensagem/          # Componente de mensagem de sucesso/erro (auto-esconde após 1s)
├── models/
│   └── playlist.model.ts  # Interfaces Playlist e Musica
├── services/
│   └── playlist.ts        # Client HTTP para a API de playlists
├── app.config.ts          # Providers da aplicação (router, HttpClient)
└── app.routes.ts
```

## Funcionalidades

- **Criar playlist** — nome e descrição, via [`FormPlaylist`](src/app/components/form-playlist/form-playlist.ts).
- **Listar playlists** — carregadas ao iniciar e recarregadas após qualquer alteração.
- **Excluir playlist**.
- **Adicionar música** a uma playlist existente (título, artista, álbum, ano, gênero).
- **Feedback visual** — mensagens de sucesso/erro exibidas via o componente `app-mensagem`, somem automaticamente após 1 segundo.
