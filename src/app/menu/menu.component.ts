import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  openDashboard(){
    this.router.navigate(['']);
  }

  openLicenses(){
    this.router.navigate(['license']);
  }

  openCredits(){
    this.router.navigate(['credits']);
  }
}
