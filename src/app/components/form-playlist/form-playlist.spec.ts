import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPlaylist } from './form-playlist';

describe('FormPlaylist', () => {
  let component: FormPlaylist;
  let fixture: ComponentFixture<FormPlaylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlaylist],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPlaylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
