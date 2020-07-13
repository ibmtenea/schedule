import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilotMonthComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";{}

@Component({
  selector: 'month-component',
  templateUrl: './month.component.html'
})
export class MonthComponent implements AfterViewInit {

  @ViewChild("month")
  month: DayPilotMonthComponent;

  events: any[] = [];

  config: any = {
    startDate: "2017-12-01",
  };

  constructor(private ds: DataService) {
  }

  ngAfterViewInit(): void {
    var from = this.month.control.visibleStart();
    var to = this.month.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

}

