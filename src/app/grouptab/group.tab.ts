import { Component, OnInit } from '@angular/core';
import { UserGroupService } from'../services/usergroup.service';

@Component({
  selector: 'app-tab',
  templateUrl: './group.tab.html'
})
export class GroupTab implements OnInit {
   constructor(private _usergroup: UserGroupService) { }
   viewMode="user";
   
   ngOnInit() {
   
   this._usergroup.groupTabSetView.subscribe(
     activeValue => {
      this.viewMode = activeValue;
     }
   )
    
  }

}
