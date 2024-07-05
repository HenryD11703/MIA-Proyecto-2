import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestonautosComponent } from './gestonautos.component';

describe('GestonautosComponent', () => {
  let component: GestonautosComponent;
  let fixture: ComponentFixture<GestonautosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestonautosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestonautosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
