import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';



@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html'
  
})
export class PendientesComponent implements OnInit {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;


  ngAfterViewInit() {
    const index = Number(localStorage.getItem('userTabLocationTemasPend')) || 0;
    this.tabGroup.selectedIndex = index;
  }
  
  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationTemasPend', String(event.index));
  }
  
  constructor() { }

  ngOnInit() {
  
  }

}