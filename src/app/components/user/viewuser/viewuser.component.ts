import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  @Input() childData:any = {}
  @Output() closeview:EventEmitter<any> = new EventEmitter();
  constructor() {

    
   }
 
  ngOnInit() {
  }
  
  
  closeDiv(event) {
    this.closeview.emit(event)
  }
 

}
