import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportincidenciasComponent } from './reportincidencias.component';

describe('ReportincidenciasComponent', () => {
  let component: ReportincidenciasComponent;
  let fixture: ComponentFixture<ReportincidenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportincidenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportincidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
