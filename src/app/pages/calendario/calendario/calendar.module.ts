import {DataService} from "./data.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {DayPilotModule} from "daypilot-pro-angular";
import {CalendarComponent} from "./calendar.component";
import {CreateComponent} from "./create.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DayPilotModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CalendarComponent,
    CreateComponent
  ],
  exports: [CalendarComponent],
  providers: [DataService]
})
export class CalendarioModule {
}
