import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceData } from '../services/service';
import { User} from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { UserGroupService } from '../services/usergroup.service';

@Component({
  selector: 'app-assigngroup',
  templateUrl: './assigngroup.component.html',
  styleUrls: ['./assigngroup.component.css']
})
export class AssigngroupComponent implements OnInit {

  @Output() closeUser = new EventEmitter();
  @Output() sendUserList =  new EventEmitter();
  
  term: any;
  total:any;
  UserList:any = [];
  addArray:any = [];
  p: number[] = [];
  public limit = 10; // Pagination row limit
  public sizes: number[] = [5, 10, 15, 20, 25] //Grid Show rows select array 
  order: string = ''; // Sort 
  reverse: boolean = false; // Sort reverse class
  selected: boolean;

selectedAll:any

constructor (
 private _toastr:ToastrService,
 private _route:Router, 
 private _usergroup:UserGroupService, 
 private _userService: ServiceData) { }


selectAll = function(event) {
  //this.allselect = event.target.checked;
  this.UserList.forEach(function(item){
    item.selected = event.target.checked;
    
  })
}


  // Fetch data from service
HandleData(data) {
  this.UserList = data;
 }
  
  // Error handler
HandleError(error) {
  console.log("Error");
  }
 

UserData() {
  this._userService.getUserData().subscribe(
  data => this.HandleData(data),
  error => this.HandleError(error)
    )

  }


// addUserList(isValid: boolean) {
// let data:any =this.UserList.filter((data) => {
//   return data.selected == true
// });
// this.sendUserList.emit(data)
// console.log(data);
// }
addUserList() {
 let data = this.UserList.filter(function(data){
  return data.selected == true;
});
this.addArray.push(data);
this.sendUserList.emit(data)
console.log(data);
this._toastr.success( "User " + data.userId + " has be added successfully" )

}


ngOnInit() {
  this.UserData();
}


setOrder(value: string) {
  if (this.order === value) {
  this.reverse = !this.reverse
  }
    this.order = value;
}

goBack() {
this._route.navigate(['/usergroupactive']);
this._usergroup.setViewMode('mygroup')
}

closeModel( value) {
   this.closeUser.emit(value)
}

}
