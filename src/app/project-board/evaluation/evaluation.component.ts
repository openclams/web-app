import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Model from 'src/app/clams-ts/model/model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evalServers = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.evalServers = environment.evalServers;
  }

  transfer(model:Model, graphIdx:number){
    
  }
}
