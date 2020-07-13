import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

  events: any[] = [
    {
      id: "1",
      start: "2017-12-04",
      end: "2017-12-05",
      text: "Event 1",
      backColor: "#ea9999"
    },
    {
      id: "2",
      start: "2017-12-05",
      end: "2017-12-08",
      text: "Event 2",
      backColor: "#a2c4c9"
    },
    {
      id: "3",
      start: "2017-12-11",
      end: "2017-12-11",
      text: "Event 3",
      backColor: "#b6d7a8"
    },
    {
      id: "4",
      start: "2017-12-11",
      end: "2017-12-11",
      text: "Event 4",
      backColor: "#ffe599"
    }
  ];

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

}
