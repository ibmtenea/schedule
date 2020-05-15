import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html'
  
})
export class IncidenciasComponent implements OnInit {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;


  ngAfterViewInit() {
    const index = Number(localStorage.getItem('userTabLocationInci')) || 0;
    this.tabGroup.selectedIndex = index;
  }
  
  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationInci', String(event.index));
  }
  
  constructor() { }

  ngOnInit() {
  
  }

}
