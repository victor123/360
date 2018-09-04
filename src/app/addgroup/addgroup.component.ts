import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserGroupService } from '../services/usergroup.service';
import { UserRolegroup } from '../models/usergroupModel';
import { Location } from '@angular/common';
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  @Output() ShareUserData = new EventEmitter();
  @Output() UrlrouterActive = new EventEmitter();
  @Input() userdata: any;
  @Input() viewMode: any;
  @Output() GroupDetailData = new EventEmitter();

  title = "Add Group Deatils";
  id: number = 0;
  groupAssign: any = [];
  sendUserList: any = [];
  userGroup: boolean = false;
  submitted: boolean = false

  // private newAttribute: any = {}

  form: FormGroup

  constructor
    (private _location: Location,
    private _formValue: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _userGroupData: UserGroupService,
    private _route: Router) {

    if (this._activatedRoute.snapshot.params['id']) {
      this.id = this._activatedRoute.snapshot.params['id'];
      console.log(this.id);
      this.title = 'Edit Group details';

    }


  }

  sendUserdata(event) {
    this.sendUserList = event;
    console.log("parent" + event);
    this.userGroup = false


  }
  int: any = 0;
  addFieldValue(user): void {
    this.int = 1;
    this.roleConfigration.push(this.createField())
    let checkEvent = this.form.get('roleConfigration').value;
  }

  deleteFieldvalue(i) {
    const control = <FormArray>this.roleConfigration;
    control.removeAt(i)
  }

  get roleConfigration(): FormArray {
    return this.form.get('roleConfigration') as FormArray;
  }

  createField(): FormGroup {
    return this._formValue.group({
      EnterGroupName: '',
      viewCheck: [false],
      createCheck: [false],
      updateCheck: [false],
      deleteCheck: [false],
      verifyCheck: [false],
      notificationCheck: [false],
      notificationCC: [false]

    })
  }


  ngOnInit() {

    if (this.id > 0) {
      this._userGroupData.getUserId(this.id)
        .subscribe(
          data => this.form.setValue(data)
        )
    }

    this.form = this._formValue.group({
      reminderModule: ['', [Validators.required]],
      GroupName: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      GroupDescription: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(300)])],
      GroupActive: '',
      Groupchecked: '',
      adminRole: this._formValue.group({
        adminGroup: '',
        adminView: [true],
        adminCreate: [true],
        adminUpdate: [true],
        adminDelete: [true],
        adminVerify: [true],
        adminNotificationTo: [true]
      }),
      roleConfigration: this._formValue.array([this.createField()])
    })
  }


  onAddgroupSubmit() {
    let formValue = this.form.value;
    if (!formValue) {
      this.submitted = true;
      return;
    }
    if (formValue.GroupActive == 'Yes') {
      formValue.GroupActive = true;
    } else if (formValue.GroupActive == 'No') {
      formValue.GroupActive = false
    }
    // this._userGroupData.updateUserGroup(this.form.value)
    // .subscribe(
    //   userId => {
    //     this._route.navigate(['/usergroupactive'])
    //   }
    // )
    this.GroupDetailData.emit(this.form.value)
    console.log(this.form.value)

  }

  useritemRemove(user, index) {
    this.groupAssign.push(this.sendUserList.splice(index, 1))
    console.log(this.groupAssign)

  }

  viewAddGroup() {
    this.userGroup = true
  }

  goBack() {
    this._route.navigate(['/usergroupactive'])
    this._userGroupData.setViewMode("group")

  }

  closeWindow(event) {
    this.userGroup = event
    event = false
  }

}
