import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectFileService} from '../project-file.service';
import {error} from "@angular/compiler/src/util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('fileInputLabel') fileInput: ElementRef;

  constructor(private router: Router, private projectFileService: ProjectFileService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  openDashboard() {
    this.router.navigate(['']);
  }

  openLicenses() {
    this.router.navigate(['license']);
  }

  openCredits() {
    this.router.navigate(['credits']);
  }

  inProject(): boolean {
    return this.router.url.includes('/project/');
  }

  downloadProject() {
    this.projectFileService.download();
  }

  handleFileInput(files: FileList) {
    try {
      this.projectFileService.uploadAll(files).then((successCounter) => this.toastr.info(`Uploaded ${successCounter} Projects`));
    } catch (e) {
      error(`Unable to upload files: ${files}`)
    }
  }

  triggerFileUpload() {
    const inputElement = this.fileInput.nativeElement;
    inputElement.click()
  }
}
