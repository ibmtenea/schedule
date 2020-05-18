import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup, _MatTabGroupBase } from '@angular/material/tabs';



@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html'
  
})
export class PendientesComponent implements OnInit {
  index:number;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;


  ngAfterViewInit() {


   const ut1 = Number(localStorage.getItem('userTabLocationTemasPend'));
  //  const ut2 = Number(localStorage.getItem('userTabLocationTemasPend2'));

    const index = ut1 ||   0;
    // const index = ut2 ||   0;

    this.tabGroup.selectedIndex = index; 

  }
  
  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationTemasPend', String(event.index));
  }
  
  handleMatTabChange2(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationTemasPend2', String(event.index));
  }
  

  constructor() { }

  ngOnInit() {
  
  }

}