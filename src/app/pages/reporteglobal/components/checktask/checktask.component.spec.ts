import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecktaskComponent } from './checktask.component';

describe('ChecktaskComponent', () => {
  let component: ChecktaskComponent;
  let fixture: ComponentFixture<ChecktaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecktaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecktaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
