import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaviajesComponent } from './rentaviajes.component';

describe('RentaviajesComponent', () => {
  let component: RentaviajesComponent;
  let fixture: ComponentFixture<RentaviajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentaviajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentaviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
