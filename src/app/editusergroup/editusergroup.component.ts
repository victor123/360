import { Component, OnInit, Input, Output, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { UserGroupService } from '../services/usergroup.service';
import { UserRolegroup} from '../models/usergroupModel';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-editusergroup',
  templateUrl: './editusergroup.component.html',
  styleUrls: ['./editusergroup.component.css']
})
export class EditusergroupComponent implements OnInit {
   
  editUserGroup:UserRolegroup[];
  private id:number;

  form: FormGroup;

  _rel:any;
  constructor(
   private _formValue: FormBuilder,
   private _groupuserData: UserGroupService,
   private _activeRouter: ActivatedRoute,
   private _route: Router) {


  this.form = this._formValue.group({
      reminderModule:'', //['', [Validators.required]],
      GroupName: '', //['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      GroupDescription: '' , //['', Validators.compose([Validators.minLength(10), Validators.maxLength(300)])],
      GroupActive: '',
      Groupchecked: '',
      AdminView: [true],
      AdminCreate: [true],
      AdminUpdate: [true],
      AdminDelete: [true],
      AdminVerify: [true],
      AdminNotificationTo: [true],
      roleConfigration: this._formValue.array([this.createField()])
    })


   }

  createField(): FormGroup {
    return this._formValue.group({
      EnterGroupName:'',
      viewCheck:   [false],
      createCheck: [false],
      updateCheck: [false],
      deleteCheck: [false],
      verifyCheck: [false],
      notificationCheck: [false],
      notificationCC: [false]

    })
  }


  ngOnInit() {
    const id = this._activeRouter.snapshot.params['id'] ;
  this._groupuserData.getUserId(id).subscribe (
    data => {
      this.editUserGroup = data;
    }
  )
}
  goBack() {
 this._route.navigate(['usergroupactive/'])
}

  getuserEditData(usergroup:UserRolegroup) {
    this._groupuserData.getUserGroupData().subscribe(
     // data => this.editUserGroup = data
    )
  }
    get reminderModule() { return this.form.get('reminderModule')}
    get GroupName() { return this.form.get('GroupName')}
    get GroupActive() { return this.form.get('GroupActive')}
 
  }


