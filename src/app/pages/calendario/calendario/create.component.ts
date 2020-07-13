import {Component, EventEmitter, Output, ViewChild} from "@angular/core";
import {DayPilot, DayPilotModalComponent} from "daypilot-pro-angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateEventParams, DataService} from "./data.service";

@Component({
  selector: 'create-dialog',
  template: `
      <daypilot-modal #modal>
          <div class="center">
              <h1>New Appointment</h1>
              <form [formGroup]="form">
                  <div class="form-item">
                      <input formControlName="name" type="text" placeholder="Appointment Name"> <span
                          *ngIf="!form.controls.name.valid">Appointment name required</span>
                  </div>
                  <div class="form-item">
                      <input formControlName="start" type="text" placeholder="Start"> <span
                          *ngIf="!form.controls.start.valid">Invalid appointment start</span>
                  </div>
                  <div class="form-item">
                      <input formControlName="end" type="text" placeholder="End"> <span
                          *ngIf="!form.controls.end.valid">Invalid appointment end</span>
                  </div>
                  <div class="form-item">
                      <button (click)="submit()" [disabled]="!form.valid">Create</button>
                      &nbsp;
                      <button (click)="cancel()">Cancel</button>
                  </div>
              </form>
          </div>
      </daypilot-modal>
  `,
  styles: [`
      form, input, button {
          font-size: 14px;
      }

      input {
          padding: 5px;
      }

      button {
          padding: 5px 15px;
      }

      .center {
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
      }

      .form-item {
          margin: 10px 0px;
      }

      .form-item span {
          padding-left: 10px;
      }
  `]
})
export class CreateComponent {
  @ViewChild("modal", {static: false}) modal: DayPilotModalComponent;
  @Output() close = new EventEmitter();

  form: FormGroup;
  dateFormat = "MM/dd/yyyy h:mm tt";

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      start: ["", this.dateTimeValidator(this.dateFormat)],
      end: ["", [Validators.required, this.dateTimeValidator(this.dateFormat)]]
    });
  }

  show(args: any) {
    args.name = "";
    this.form.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: ""
    });
    this.modal.show();
  }

  submit() {
    let data = this.form.getRawValue();

    let params: CreateEventParams = {
      start: DayPilot.Date.parse(data.start, this.dateFormat).toString(),
      end: DayPilot.Date.parse(data.end, this.dateFormat).toString(),
      text: data.name
    };

    this.ds.createEvent(params).subscribe(result => {
      params.id = result.id;
      this.modal.hide();
      this.close.emit(params);
    });
  }

  cancel() {
    this.modal.hide();
    this.close.emit();
  }

  closed() {
    this.close.emit();
  }

  dateTimeValidator(format: string) {
    return function (c: FormControl) {
      let valid = !!DayPilot.Date.parse(c.value, format);
      return valid ? null : {badDateTimeFormat: true};
    };
  }
}
