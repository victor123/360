import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { UserGroupService } from '../services/usergroup.service';
import { UserRolegroup} from '../models/usergroupModel';

@Component({
  selector: 'app-viewusergroup',
  templateUrl: './viewusergroup.component.html',
  styleUrls: ['./viewusergroup.component.css']
})
export class ViewusergroupComponent implements OnInit {
@Output() viewClose:EventEmitter<any> = new EventEmitter();
userGroupView:UserRolegroup[]= [];
seletedID: number;
id;
constructor(
private _route: Router,
private _activeRouter:ActivatedRoute,
private _usergroupData:UserGroupService) { }

closeView() {
this._route.navigate(['usergroupactive'])
//this._route.navigate(['viewgroup',{id:this.id}])\
}

goBack() {
 this._route.navigate(['viewgroup',{id:this.id}])
}

  ngOnInit() {
    // this.userGroupView = this._activeRouter.paramMap
    // .switchMap((params: ParamMap) => {
    // this.seletedID = +params.get('id');
    // return this._usergroupData.getUserId();
   
    // });
    
 this.id = this._activeRouter.snapshot.params['id'];
  this._usergroupData.getUserId(this.id).subscribe(
    data => {
       this.userGroupView = data 
       console.log(data);
    }
  )

  }

}
