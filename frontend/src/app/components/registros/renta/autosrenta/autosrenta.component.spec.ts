import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosrentaComponent } from './autosrenta.component';

describe('AutosrentaComponent', () => {
  let component: AutosrentaComponent;
  let fixture: ComponentFixture<AutosrentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutosrentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutosrentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
