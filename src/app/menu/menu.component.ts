import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectFileService} from '../project-file.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router, private projectFileService: ProjectFileService) { }

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

  inProject(): boolean {
    return this.router.url.includes('/project/');
  }

  downloadProject() {
    this.projectFileService.download();
  }
}
