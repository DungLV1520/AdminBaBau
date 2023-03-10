import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-coming-soon",
  templateUrl: "./coming-soon.component.html",
  styleUrls: ["./coming-soon.component.scss"],
})
export class ComingSoonComponent implements OnInit {
  year: number = new Date().getFullYear();
  private _trialEndsAt: any;
  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;

  constructor() {}

  ngOnInit(): void {
    this._trialEndsAt = "2022-12-31";

    interval(1000)
      .pipe(
        map((x) => {
          this._diff =
            Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
        })
      )
      .subscribe((x) => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);
      });
  }

  getDays(t: number) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t: number) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t: number) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t: number) {
    return Math.floor((t / 1000) % 60);
  }
}
