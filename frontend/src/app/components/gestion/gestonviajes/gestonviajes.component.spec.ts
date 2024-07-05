import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestonviajesComponent } from './gestonviajes.component';

describe('GestonviajesComponent', () => {
  let component: GestonviajesComponent;
  let fixture: ComponentFixture<GestonviajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestonviajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestonviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
