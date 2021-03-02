import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCereminyComponent } from './create-cereminy.component';

describe('CreateCereminyComponent', () => {
  let component: CreateCereminyComponent;
  let fixture: ComponentFixture<CreateCereminyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCereminyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCereminyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
