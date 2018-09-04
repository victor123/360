import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-reminder-calendar',
  templateUrl: './reminder-calendar.component.html',
  styleUrls: ['./reminder-calendar.component.css']
})
export class ReminderCalendarComponent implements OnInit {
  @Input() reminder = [];

  public date = moment();
  public dayArr;
  public count = 0;

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

  constructor(
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.dayArr = this.createCalendar(this.date);
  }

  public createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });
    return days;
  }

  public nextMonth() {
    this.date.add(1, 'M');
    this.dayArr = this.createCalendar(this.date)
  }

  public previousMonth() {
    this.date.subtract(1, 'M');
    this.dayArr = this.createCalendar(this.date)
  }

  public today(day) {
    if (!day) {
      return false
    }
    return moment().format("L") === day.format('L')
  }

  public isSelected(day) {
    if (!day) {
      return false
    }

    let date = day.format('L');
    for (let i = 0; i < this.reminder.length; i++) {
      let reminderDate = this.reminder[i];
      // console.log(reminderDate[i])
      return reminderDate === date
    }
  }
}
