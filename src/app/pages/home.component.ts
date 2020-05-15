import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
  
})
export class HomeComponent implements AfterViewInit, OnInit {



  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;


  ngAfterViewInit() {
    const index = Number(localStorage.getItem('userTabLocationRB4')) || 0;
    this.tabGroup.selectedIndex = index;
  }
  
  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationRB4', String(event.index));
  }
  
  constructor() { }

  ngOnInit() {
  
  }



}
