import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceData } from '../../../services/service';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addgroupComponent',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {

  @Output() closeUser = new EventEmitter();
  @Output() sendUserList = new EventEmitter();


  term: any;
  UserList: any = []
  addArray: any = [];
  p: number[] = [];
  total: any;

  public limit = 5; // Pagination row limit
  public sizes: number[] = [5, 10, 15, 20, 25] //Grid Show rows select array 
  order: string = ''; // Sort 
  reverse: boolean = false; // Sort reverse class
  public itemsPerPage: any;

  selectedAll: any

  constructor(
    private _userService: ServiceData,
    private _toastr: ToastrService
  ) { }

  selectAll = function (event) {
    //this.allselect = event.target.checked;
    this.UserList.forEach(function (item) {
      item.selected = event.target.checked;

    })
  }
  // Fetch data from service
  HandleData(data: any) {
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

  addUserList(isValid: boolean) {
    let data = this.UserList.filter(function (data) {
      return data.selected == true;
    });


    this.addArray.push(data);
    this.sendUserList.emit(data)
    console.log(data);
    this._toastr.success("User " + data.userId + " has be added successfully")

  }


  // addUserList(event) {
  // let data:any = this.addArray;
  // this.sendUserList.emit(data)
  // console.log(data);
  // }


  ngOnInit() {
    this.UserData();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse
    }
    this.order = value;
  }

  closeModel(value) {
    this.closeUser.emit(value)
  }
}
