import { Component, OnInit } from '@angular/core';
import { ServiceData } from '../services/service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
selectList:any[] = [
  {option:'200, 55, 100'},
  {option:'300, 78, 100'},
  {option:'100, 85, 100'}
]

  public colorRed:string;
  selectedUser: any = [];
  childData: any = {};
  editUser: any = {};
  public viewUser: boolean = false;
  public showHide: boolean = false;
  editProductForm: boolean = false;
  productForm: boolean = false;
  updatButton: boolean = false;
  isNewForm: boolean;
  // saveButton: boolean = false;
  // public createButton: boolean = false;
  filteredList: any = [];
 
  statusMessage: string = 'Data not found';

  newProduct: any = {}
  email: any = [];
  //filter
  public query = '';
  public elementRef;
  selectedIdx: number;

  list: any = []

  // userForm: FormGroup
  formTitle: string = ''
  // Pagination 
  term: any;
  total: any;

  p: number[] = [];
  public limit = 10; // Pagination row limit
  order: string = ''; // Sort 
  reverse: boolean = false; // Sort reverse class
  parentMessage = [];
  public dataList: any = {}

  public UserList: any = [];
  public sizes: number[] = [5, 10, 15, 20, 25] //Grid Show rows select array 

  constructor(
    private _userData: ServiceData,
    private _toastr: ToastrService) {
      this.colorRed = "200, 55, 100"
  }


  filter(user: any) {
    if (user.active == true) {
      user.active = 'Yes'
    } else if (user.active == false) {
      user.active = 'No'

    }
    if (user.userAdmin == true) {
      user.userAdmin = 'Yes'
    } else if (user.userAdmin == false) {
      user.userAdmin = 'No'

    }
    if (user.groupAdmin == true) {
      user.groupAdmin = 'Yes'
    } else if (user.groupAdmin == false) {
      user.groupAdmin = 'No'
    }
  }

  // Fetch data from service
  HandleData(data: any) {

    if (data == null) {
      this.statusMessage = 'Loading data.Please wait...'

    } else {
      this.UserList = data;
    }
    data.forEach((key, value) => {
      this.filter(key);
    });
  }


  filteredit(user: any) {
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


  UserData() {
    this._userData.getUserData().subscribe(
      data => this.HandleData(data),
      (error) => {
        this.statusMessage = "Problem with the service. Please try again after sometime"
      })
  }

  ngOnInit() {
    this.UserData();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse
    }
    this.order = value;
  }


  loadUserToEdit(user: User) {
    //this.filteredit(user);
    this.editProductForm = true;
    this.editUser = user

    console.log("Edit", user)
    this.isNewForm = false;
}

  showAddProductForm() {
    if (this.UserList.length) {
      // this.newProduct = {}
      // this.updatButton = false
      // this.userForm.reset();
    }
    // this.formTitle = "Add User"
    this.productForm = true
    //this.saveButton = true

  }

  closeModel(valid: boolean) {
    if (confirm("Are you sure want to close")) {

      this.productForm = false;
      this._toastr.error("No record will be saved")
      //this.userForm.reset();
    }
  }

  editclose(valid: any, user: any) {

    if (confirm("Are you sure want to close")) {

      this.editProductForm = false;
      this._toastr.error("No record will be saved")
      //this.userForm.reset();
    }

  }

  filterClose(user: any) {
    if (user.active == true) {
      user.active = 'Yes'
    } else if (user.active == false) {
      user.active = 'No'

    }
    if (user.userAdmin == true) {
      user.userAdmin = 'Yes'
    } else if (user.userAdmin == false) {
      user.userAdmin = 'No'

    }
    if (user.groupAdmin == true) {
      user.groupAdmin = 'Yes'
    } else if (user.groupAdmin == false) {
      user.groupAdmin = 'No'
    }
  }

  view(user: User) {
    this.viewUser = true
    this.childData = user;
    console.log(user)

  }

  closePop(value) {
    if (confirm("Are you sure want to close")) {

      this.viewUser = value;
      value = false;
    }
    //this.userForm.reset();

  }

  receiveData(value: any) {
    this.dataList = value;
    this.UserList.push(value)
    console.log(this.dataList);
    this.showHide = false

  }

  hideUser(value) {
    this.showHide = value;
    value = false;
  }

  addUser(user: User) {

    if (user.active == 'Yes') {
      user.active = true
    }
    if (confirm("Are you sure to add this user in Reminder")) {
      this.UserList.push(user);
      this._toastr.success("User " + user.userId + " has be added to Reminder365 successfully")
      console.log(user);
      this.productForm = false
    }
}


  updateUser(user: User) {
    this._toastr.warning("User " + user.userId + " has be Updated to Reminder365 successfully")
    console.log(user);
    this.productForm = false
    console.log("user", user)
  }


  // edit(productItem) {
  //   this.parentMessage = productItem
  //   this.showHide = true
  //   this.createButton = true
  // }

  userClick() {
    this.showHide = !this.showHide
  }

  submitclose(event: boolean) {
    this.productForm = false;

  }
  updateCloser(close: boolean) {
    this.editProductForm = false;
  }


}
