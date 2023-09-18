import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsFilmComponent } from './payments-film.component';

describe('PaymentsFilmComponent', () => {
  let component: PaymentsFilmComponent;
  let fixture: ComponentFixture<PaymentsFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsFilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
