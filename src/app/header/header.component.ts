import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logo:any ="../assets/img/365-logo.png"
  constructor() { }
   
  ngOnInit() {
document.getElementById('toggleMenu').addEventListener('click',function() {
  document.getElementById("wrapper").classList.toggle("menuActive");
  document.getElementById("menu").classList.toggle("menuActive");
})

}

}
