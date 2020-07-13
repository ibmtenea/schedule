import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient} from "@angular/common/http";
import EventData = DayPilot.EventData;

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  getEvents(start: DayPilot.Date, end: DayPilot.Date): Observable<EventData[]> {
    return this.http.post("/api/backend_events.php", {start: start, end: end}) as Observable<EventData[]>;
  }

  createEvent(params: CreateEventParams): Observable<BackendResult> {
    return this.http.post("/api/backend_create.php", params) as Observable<BackendResult>;
  }

  deleteEvent(id: string): Observable<BackendResult> {
    return this.http.post("/api/backend_delete.php", {id: id}) as Observable<BackendResult>;
  }

  moveEvent(params: MoveEventParams): Observable<BackendResult> {
    return this.http.post("/api/backend_move.php", params) as Observable<BackendResult>;
  }
}

export interface CreateEventParams {
  id?: string | number;
  start: string;
  end: string;
  text: string;
}

export interface MoveEventParams {
  id: string | number;
  newStart: string;
  newEnd: string;
}

export interface BackendResult {
  id: string | number;
  result: string;
  message: string;
}

