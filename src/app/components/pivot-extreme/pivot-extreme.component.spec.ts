import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotExtremeComponent } from './pivot-extreme.component';

describe('PivotExtremeComponent', () => {
  let component: PivotExtremeComponent;
  let fixture: ComponentFixture<PivotExtremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotExtremeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PivotExtremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
