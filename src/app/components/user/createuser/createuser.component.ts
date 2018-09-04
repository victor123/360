import { Component, OnInit, Output, EventEmitter,HostListener,ElementRef,  AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceData } from '../../../services/service';
import { User } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createuser',
  host: {
    '(document:click)': 'handleClick($event)',
    '(keydown)': 'handleKeyDown($event)'
  },
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  public phoneFmt = ['+', /[1-9]/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
  public newUser:any = [];
  @Output() createViewClose: EventEmitter<any> = new EventEmitter();
  @Output() submitClose: EventEmitter<any> = new EventEmitter();
  
  active:any = 'false';
  query: string = '';
  filteredList: any[] = [];
  elementRef: ElementRef;
  pos: number = -1;
  opened: boolean = false;
  selectedItem:any= [];
  items:User[] = [];
  userForm: FormGroup
  constructor(
    private el: ElementRef,
    private _userData: ServiceData,
    private _formbuild: FormBuilder,
    private ref:ChangeDetectorRef,
    private _toastr: ToastrService) {    
    this.elementRef = el;
    
    this.userForm = this._formbuild.group({
//userId:'',
     // userId: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(7)])],
      userName: [null, Validators.required],
      emailId: [null, Validators.compose([Validators.required, Validators.email])],
      mobileNumber: '',
      remark: '',
      active:''
          

    })
    

  }

 
ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

   filterQuery() {
    this.filteredList = this.items.filter((el: any) => {
      return el.userId.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    });
  }
  
  
  filter(event: any) {

    if (this.query !== '') {
      if (this.opened) {

        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 65 && event.keyCode <= 90) ||
          (event.keyCode == 8)) {

          this.pos = 0;
          this.filterQuery();

        } else if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {
          this.filteredList = this.items;
        }
      } else {
        this.filterQuery();
      }
    } else {
      if (this.opened) {
        this.filteredList = this.items;
      } else {
        this.filteredList = [];
      }
    }

    for (let i = 0; i < this.filteredList.length; i++) {
      this.filteredList[i].selected = false;
    }

    if (this.selectedItem) {
      this.filteredList.map((i) => {
        if (i.userId == this.selectedItem.userId) {
          this.pos = this.filteredList.indexOf(i);
        }
      })
      this.selectedItem = null;
    }

    // Arrow-key Down
    if (event.keyCode == 40) {
      if (this.pos + 1 != this.filteredList.length)
        this.pos++;
    }

    // Arrow-key Up
    if (event.keyCode == 38) {
      if (this.pos > 0)
        this.pos--;
    }

    if (this.filteredList[this.pos] !== undefined)
      this.filteredList[this.pos].selected = true;

    //enter
    if (event.keyCode == 13) {
      if (this.filteredList[this.pos] !== undefined) {
        this.select(this.filteredList[this.pos]);
      }
    }

    // Handle scroll position of item
    let listGroup = document.getElementById('list-group');
    let listItem = document.getElementById('true');
    if (listItem) {
      listGroup.scrollTop = (listItem.offsetTop - 200);
    }

  }

  select(item: any) {
    this.selectedItem = item;
    this.newUser = item;
    this.selectedItem.selected = true;
    this.query = item.userId;
    this.filteredList = [];
  }

  showAll(input: any) {
    input.select();

    if (this.filteredList.length > 0) {
      this.opened = false;
      this.filteredList = [];
    } else {
      this.opened = true;
      this.filteredList = this.items;
    }
    if (this.query === '') {
      this.clearAll();
    }

    this.clearSelects();
  }

  handleKeyDown(event: any) {
    // Prevent default actions of arrows
    if (event.keyCode == 40 || event.keyCode == 38) {
      event.preventDefault();
    }
  }

  clearAll() {
    if (this.filteredList) {
      for (let i = 0; i < this.filteredList.length; i++)
        this.filteredList[i].selected = false;
    }
  }


  clearSelects() {
    //Remove selected from all items
    if (this.selectedItem) {
      for (let i = 0; i < this.filteredList.length; i++) {
        if (this.filteredList[i].userId != this.selectedItem.userId)
          this.filteredList[i].selected = false;
      }
    }
  }

  handleClick(event: any) {
   // Handle outside click 
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
      this.opened = false;
    }
  }


  addUser(event:boolean,user: User) {
  console.log("Component", user);
   this.submitClose.emit(event);
   if (confirm("Are you sure to add this user in Reminder")) {
     
      this._userData.CreateUser(user)
        .subscribe(
        data => {
          this._userData.getUserData();
          this.userForm.reset();
        }
        )
      this._toastr.success("User " + user.userId + " has be added to Reminder365 successfully")
          
    }
  }
  
  closeModel(event) {
    this.createViewClose.emit(event)
  }

  ngOnInit() {
    this.listUsersData();
    
  }

   ngAfterViewInit() {

  }

  dataHandle(data: any) {
    this.items = data;
    console.log("Create User",this.items)
      }
  listUsersData() {
    this._userData.getUserData()
    .subscribe(
    data => this.dataHandle(data)

    )
   
  }

}
