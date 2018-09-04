import { Injectable } from '@angular/core';
import {Http, Headers, Response,RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';
import { Usergroup} from '../models/group.model'
import { mygroup} from '../models/mygroup.model'

@Injectable()

export class ServiceData{
selectedUser:User;
private chart:string = 'assets/chart.json';

private Url:string = 'assets/data.json'; 
//private  createUrl:string = 'http://172.16.0.246:8080/Reminder365/createUser'
private  createUrl:string = 'http://172.16.1.88:8080/Reminder365/createUser'
//private  Url:string = 'http://172.16.0.246:8080/Reminder365/users'; 
//private  Url:string = 'http://172.30.241.232:4500/Reminder365/users'; 

//private  Url:string = 'http://172.16.1.88:8080/Reminder365/users'; 
 private Update:string = 'http://172.16.1.88:8080/Reminder365/updateUser'; 
 private groupUrl = 'assets/usergroup.json';
 private mygroupUrl = 'assets/mygroup.json';

constructor( private _http:Http) {}
 private baseUrl: '';

getUserData():Observable<User> {
    return this._http.get(this.Url)
     .map(res => res.json());

}

CreateUser(user:User): Observable<any> {
  
   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this._http.post(this.createUrl,user,options)
    // .map(res => res.json());
  }

  getUserById(userId:any): Observable<User> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: cpHeaders });

    return this._http.get(this.Url +"/"+ userId)
    .map(res => res.json());
}


  updateUser(user) {
     let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this._http.put(this.Update,user, requestOptions)
    // .map(res => res.json());
  }


getGroupData():Observable<Usergroup[]> {
    return this._http.get(this.groupUrl).map(res=> res.json());

}

MyGroupData():Observable<mygroup[]> {
    return this._http.get(this.mygroupUrl).map(res=> res.json());

}

// Add Userr
// addUser(user): Observable<User[]> {
//      return this._http.post(this.Url + 'adduser', user).map(res => res.json());

// }

// deleteUser(id){
//   return this._http.delete(this.Url + 'deletUser',+id).map(res => res.json())
      
// }

private getHeader() {
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
  return headers;
}

getChartData() {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
   return this._http.get(this.chart)
    .map(res => res.json());
}




}

