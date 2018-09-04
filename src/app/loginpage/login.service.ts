import { Injectable } from '@angular/core';
import { Http,Headers, URLSearchParams, RequestOptions, Response  } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Credentials } from './login.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  login():Observable<Credentials[]> {
       let headers = new Headers({'Content-Type': 'application/json'});
    //    let headers= new Headers();
    //     let params = new URLSearchParams();
    // params.set('username', credentials.username);
    // params.set('password', credentials.password);
        let options = new RequestOptions({ headers: headers});
        console.log("Option--",headers);
        return this.http.post('http://172.16.1.88:8080/Reminder365/login', options)
        .map(res => res = res.json()) 
        

    //     login(credentials) {
    //   this.http.post('https://my-app.com/api/authenticate', credentials)
    //     .map(res => res.json())
    //     .subscribe(
    //      
    //       data => localStorage.setItem('id_token', data.id_token),
    //       error => console.log(error)
    //     );
    // }
  }
 

}