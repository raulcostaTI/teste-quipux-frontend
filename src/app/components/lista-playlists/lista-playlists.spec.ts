import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPlaylists } from './lista-playlists';

describe('ListaPlaylists', () => {
  let component: ListaPlaylists;
  let fixture: ComponentFixture<ListaPlaylists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPlaylists],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPlaylists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
