import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteruseradminComponent } from './registeruseradmin.component';

describe('RegisteruseradminComponent', () => {
  let component: RegisteruseradminComponent;
  let fixture: ComponentFixture<RegisteruseradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteruseradminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteruseradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
