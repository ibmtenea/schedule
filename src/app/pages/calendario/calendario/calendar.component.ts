import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent} from "daypilot-pro-angular";
import {DataService, MoveEventParams} from "./data.service";
import {CreateComponent} from "./create.component";

@Component({
  selector: 'calendar-component',
  template: `
      <div class="column-left">
          <daypilot-navigator [config]="navigatorConfig" [(date)]="calendarConfig.startDate"></daypilot-navigator>
      </div>
      <div class="column-main">
          <daypilot-calendar #calendar [events]="events" [config]="calendarConfig"
                             (viewChange)="viewChange()"></daypilot-calendar>
      </div>
      <create-dialog #create (close)="createClosed($event)"></create-dialog>
  `,
  styles: [`
      .column-left {
          width: 220px;
          float: left;
      }

      .column-main {
          margin-left: 220px;
      }
  `]
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild("calendar", {static: false}) calendar: DayPilotCalendarComponent;
  @ViewChild("create", {static: false}) create: CreateComponent;

  events: any[];

  navigatorConfig = {
    selectMode: "week",
    showMonths: 3,
    skipMonths: 3
  };

  calendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    eventDeleteHandling: "Update",
    onEventDeleted: args => {
      this.ds.deleteEvent(args.e.id()).subscribe(result => this.calendar.control.message("Deleted"));
    },
    onEventMoved: args => {
      let params: MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Moved"));
    },
    onEventResized: args => {
      let params: MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Resized"));
    },
    onTimeRangeSelected: args => {
      this.create.show(args);
    }
  };

  constructor(private ds: DataService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }

  viewChange() {
    this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);

  }

  createClosed(result) {
    if (result) {
      this.events.push(result);
    }
    this.calendar.control.clearSelection();
  }

}
