import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
   reminder = ['01/12/2018','01/05/2018','01/01/2018']
  constructor() { }

  ngOnInit() {
    
  }


}
