import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() CalendarReminder = [];

  weeks = ['Sa', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  public date = moment();
  public weekArray = moment.weekdays()
  public dayArr;
  public count = 0;
 
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
}

  constructor(
  private ref:ChangeDetectorRef) { }

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

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
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

if (this.count === 0) {
      for (let i=0; i < this.CalendarReminder.length;i++) {
      let datef = moment(this.CalendarReminder[i],'MM/DD/YYYY');
       return datef.isSame(day);
     }
     this.count++;
    }
  }
}
