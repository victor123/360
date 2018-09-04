import { Component, OnInit } from '@angular/core';
import { ServiceData } from '../services/service';
//import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reminder = ['01-17-2018', '01-16-2018', '01-17-2018']
  chart = [];
  constructor(private _chartData: ServiceData) { }

  chartdata() {
    this._chartData.getChartData()
      .subscribe(
      data => {
        let temp_max = data['list'].map(res => res.main.temp_max);
        let wind_speed = data['list'].map(res => res.wind.speed);
        let alldates = data['list'].map(res => res.dt)

        //console.log(alldates)
        let weatherdate = [];
        alldates.forEach((data) => {
          let jsdate = new Date(data * 1000)
          weatherdate.push(jsdate.toLocaleTimeString('en',

            {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }))

        //     this.chart = new Chart('canvas', {
        //   type: 'line',
        //   data: {
        //     labels: weatherdate,
        //     datasets: [
        //       { 
        //         data: temp_max,
        //         borderColor: "#3cba9f",
        //         fill: false
        //       },
        //       { 
        //         data: temp_max,
        //         borderColor: "#ffcc00",
        //         fill: false
        //       },
        //     ]
        //   },
        //   options: {
        //     legend: {
        //       display: false
        //     },
        //     scales: {
        //       xAxes: [{
        //         display: true
        //       }],
        //       yAxes: [{
        //         display: true
        //       }],
        //     }
        //   }
        // });
        })
        console.log(weatherdate)
      }
      )
  }

  ngOnInit() {
    this.chartdata()
  }

}
