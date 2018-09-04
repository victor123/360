import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceData } from '../services/service';
import { Observable } from 'rxjs/Observable';
import { mygroup } from '../models/mygroup.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mygroup',
  templateUrl: './mygroup.component.html',
  styleUrls: ['./mygroup.component.css']
})

export class MygroupComponent implements OnInit {
  private sel: any;
  total:any;
  term:any;
  p: number[] = [];
  public limit = 10; // Pagination row limit
  public sizess: number[] = [5, 10, 15, 20, 25] //Grid Show rows select array 
  mygroup:any = [];
  order: string = ''; // Sort 
  reverse: boolean = false; // Sort reverse class

  filterModel = [{ model:"Assets"},{ model:"Staff"},{ model:"Contract"}]
  filterGroup = [{group:"FMD-Operation"},{group:"FMD-TS"},{group:"Finance"}]
  filterRole = [{role:"Administrator"},{role:"Officer in Charge"},{role:"Read only"},{role:"User"}]
  
productsAfterChangeEvent = [];
productForm: FormGroup;

constructor(fb: FormBuilder, private _mygroup: ServiceData, private _route:Router) {
 }

submitForm() {
    console.log('Form Data', this.productForm.value);
}

groupData(groupdata){
   this.mygroup = groupdata;
   console.log(groupdata);
}
 
error(error) {
   console.log(error)
}

mygroupList() {
    this._mygroup.MyGroupData().subscribe(
    groupdata => this.groupData(groupdata),
    error => this.error(error)
    )
  }

deleteGroup(id) {
  let ans = confirm("Do you want to delete customer with Id: " + id);
  if(ans) {
  let Index = this.mygroup.map( x => x.id == id);
  this.mygroup.splice(Index, 1);
  }
}

 ngOnInit() {
 this.mygroupList()
 }

 assignRole() {
 this._route.navigate(['/assignGroup'])
}

 setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse
 }
    this.order = value;
 }
}
