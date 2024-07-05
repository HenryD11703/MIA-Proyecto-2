import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaviajesComponent } from './listaviajes.component';

describe('ListaviajesComponent', () => {
  let component: ListaviajesComponent;
  let fixture: ComponentFixture<ListaviajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaviajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
