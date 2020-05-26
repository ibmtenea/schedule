import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosaplicadosComponent } from './cambiosaplicados.component';

describe('CambiosaplicadosComponent', () => {
  let component: CambiosaplicadosComponent;
  let fixture: ComponentFixture<CambiosaplicadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiosaplicadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiosaplicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
