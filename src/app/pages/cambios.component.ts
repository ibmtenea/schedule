import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';



@Component({
  selector: 'app-cambios',
  templateUrl: './cambios.component.html'
  
})
export class CambiosComponent implements OnInit {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;


  ngAfterViewInit() {
    const index = Number(localStorage.getItem('userTabLocationCambios')) || 0;
    this.tabGroup.selectedIndex = index;
  }
  
  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationCambios', String(event.index));
  }
  
  constructor() { }

  ngOnInit() {
  
  }

}
