import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegRecepcionistaComponent } from './reg-recepcionista.component';

describe('RegRecepcionistaComponent', () => {
  let component: RegRecepcionistaComponent;
  let fixture: ComponentFixture<RegRecepcionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegRecepcionistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
