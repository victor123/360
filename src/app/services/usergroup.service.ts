import { Injectable } from '@angular/core';
import {Http, Headers, Response,RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject, Subject} from 'rxjs';
import 'rxjs/add/operator/map';
//import { Usergroup} from '../models/group.model'
import { UserRolegroup} from '../models/usergroupModel';

@Injectable()

export class UserGroupService{
  public groupTabSetView = new BehaviorSubject("user")
selectedUser:UserRolegroup;
//private Url:string = 'assets/data.json'; 
//private  userGroup:string = 'http://172.16.0.246:8080/Reminder365/groups'
//private  userGroup:string = 'http://172.16.1.88:8080/Reminder365/groups'
//private dummyjson = 'assets/addrole.json'
private  userGroup:string = 'assets/addrole.json';
private  CreateGroup:string = 'http://172.16.1.88:8080/Reminder365/groups';
private  updateuserGroup:string = 'http://172.16.1.88:8080/Reminder365/groups';


constructor( private _http:Http) {}

getUserGroupData():Observable<UserRolegroup[]> {
    return this._http.get(this.userGroup)
     .map(res => res.json());
     
}


getUserId(id): Observable<UserRolegroup[]> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
 return this._http.get(this.userGroup +"/" + id, options)
   .map(res => res.json());
}

CreateUserGroup(usergroup:UserRolegroup): Observable<any> {
    console.log("Service",usergroup);
   //let body = JSON.stringify(user);
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this._http.post(this.CreateGroup,usergroup,options).map(res => res.json());
  }

//   getUserById(id:any): Observable<UserRolegroup> {
//     return this._http.get(this.userGroup)
//     .map(res => res.json());
// }


//   getUserById(userId:any): Observable<User> {
//       let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
// 	let options = new RequestOptions({ headers: cpHeaders });
//     console.log(this.Url +"/"+ userId);
//     return this._http.get(this.Url +"/"+ userId)
//     .map(res => res.json());
// }


  updateUserGroup(usergroup) {
     // console.log(userId);
    //let body = JSON.stringify(user);
    let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this._http.put(this.updateuserGroup,usergroup, requestOptions)
    // .map(res => res.json());
  }
 
 deleteUserGroup(groupId: number) {
     return this._http.delete(this.userGroup + groupId)
     .map(res => res.json());

 }

    deleteUserId(id){
      return this._http.delete(this.userGroup + id)
                .map((response:Response) =>  response.json())
   }

setViewMode(mode) {
  this.groupTabSetView.next(mode)
}
  
}

