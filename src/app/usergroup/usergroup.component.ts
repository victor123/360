import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserGroupService } from '../services/usergroup.service';
import { Observable } from 'rxjs/Observable';
import { UserRolegroup } from '../models/usergroupModel';
//import { Usergroup} from '../models/group.model'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
  p: number[] = [];
  total:any;
  term:any;
  public limit = 10; // Pagination row limit
  public sizess: number[] = [5, 10, 15, 20, 25] //Grid Show rows select array 
  mygrouplist: any[] = [];
  order: string = ''; // Sort 
  reverse: boolean = false; // Sort reverse class
  dataStore = [];
  currentId:number = 0;

  ProductId:string;
  constructor(
    private _location: Location, 
    private _getGroupUser: UserGroupService,
    private _activatedRouter: ActivatedRoute,
    private _route: Router) { }


  groupData(data) {
    this.mygrouplist = data;
    console.log("Group Data", data)
    data.forEach((key, value) => {
      this.dataStore.push(key);
      //console.log("Data store",this.dataStore)
      this.filter(key);
    })



  }
  error(error) {
    console.log(error)
  }
  usergroupList() {
    this._getGroupUser.getUserGroupData().subscribe(
      data => this.groupData(data),
      error => this.error(error)
    )
  }

  filter(UserRolegroup: any) {
    if (UserRolegroup.active == true) {
      UserRolegroup.active = "Active"
    } else if (UserRolegroup.active == false) {
      UserRolegroup.active = "Inactive"

    }

  }


// Edit method


  ngOnInit() {
    if(this._activatedRouter.snapshot.params['id'])
    this.currentId = this._activatedRouter.snapshot.params['id'];
  this.usergroupList();
   }

  // groupdetaildata(value:any) {
  //   this.mygrouplist.push(value)
  //   console.log("UserGroup", value)
  // }



  showAddgroupForm() {
    // this._route.navigate(['/usergroup/add'])
    this._route.navigate(['addgroup/add'])

  }


  editGroup(groupItem: UserRolegroup) {
    console.log("User group edit", groupItem)
   this._route.navigate(['usergroupEdit'])
   // this._route.navigate(['addgroup/edit/', groupItem.id])
  }
  
  viewGroup(groupItem: UserRolegroup) {
    console.log(groupItem);
    this._route.navigate(['viewgroup/',groupItem.id])
  }

  deleteGroup(id) {
     let ans = confirm("Do you want to delete customer with Id: " + id);
    if(ans){
    let index = this.mygrouplist.findIndex(x => x.id == id);
    this.mygrouplist.splice(index,1);
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse
    }
    this.order = value;
  }
  
}
