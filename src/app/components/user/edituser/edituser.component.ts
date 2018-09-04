import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceData } from '../../../services/service';
import { User } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html'

})
export class EdituserComponent implements OnInit {
  public phoneFmt = ['+', /[1-9]/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
  // public newUser:User[]=[];
  @Output() editeventClose: EventEmitter<any> = new EventEmitter();
  @Output() UpdateUserClose: EventEmitter<any> = new EventEmitter();

  @Input() editUser:any = {};

  editForm: FormGroup
  constructor(private _userData: ServiceData, private _formbuild: FormBuilder, private _toastr: ToastrService) {
    this.editForm = this._formbuild.group({

      userId: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(7)])],
      userName: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(25)])],
      emailId: ['', Validators.compose([Validators.required, Validators.email])],
      mobileNumber: '',
      remark: '',
      userAdmin: '',
      groupAdmin: '',
      createdById: '',
      createdAt: '',
      lastModifiedById: '',
      lastModifiedAt: '',

    })
  }

  editUpdateUser(event: boolean, user: User) {
    this.UpdateUserClose.emit(event);
    this.filter(user);
    if (confirm("Are you sure will update this user in Reminder")) {
      this._userData.updateUser(this.editForm.value)
        .subscribe(
        data => {
        this._userData.getUserData();
      }
    )
      this._userData.getUserData();
      this._toastr.success("User" + user.userId + " has be Updated to Reminder365 successfully")
      console.log(user);
    }
  }

  filter(user: any) {
    if (user.active == 'Yes') {
      user.active = true
    } else if (user.active == 'No') {
      user.active = false

    }
    if (user.userAdmin == 'Yes') {
      user.userAdmin = true
    } else if (user.userAdmin == 'No') {
      user.userAdmin = false
    }

    if (user.groupAdmin == 'Yes') {
      user.groupAdmin = true
    } else if (user.groupAdmin == 'No') {
      user.groupAdmin = false
    }
  }

  editClose(event: any) {
    console.log("closeUser");
    this.editeventClose.emit(event)
  }
  
  ngOnInit() {
   
  }

}
