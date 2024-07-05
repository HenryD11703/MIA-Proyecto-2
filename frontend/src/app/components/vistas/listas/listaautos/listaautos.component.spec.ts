import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaautosComponent } from './listaautos.component';

describe('ListaautosComponent', () => {
  let component: ListaautosComponent;
  let fixture: ComponentFixture<ListaautosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaautosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaautosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
