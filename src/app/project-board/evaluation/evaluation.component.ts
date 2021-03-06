import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {Model, ModelFactory} from '@openclams/clams-ml';
import { ComponentEventType } from 'src/app/events/component-event-type';
import { GraphService } from 'src/app/graph.service';
import JsonEvalServer from 'src/app/model/json-eval-server';
import JsonReplacementProtocol from 'src/app/model/json-replacement-protocol';
import { ProjectService } from 'src/app/project.service';
import { environment } from '../../../environments/environment';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { ReplacementDialogComponent } from './replacement-dialog/replacement-dialog.component';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evalServers:JsonEvalServer[] = [];

  constructor(private http: HttpClient,
    private graphService: GraphService,
    private projectService:ProjectService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.evalServers = environment.evalServers as JsonEvalServer[];
  }

  transfer(server: JsonEvalServer){

    const param = {
      model: ModelFactory.toJSON(this.projectService.project.model)
    }

    if(this.projectService.getActiveFrame() &&
       this.projectService.getActiveFrame().activeGraph){
        param['graphIdx'] = this.projectService.getActiveFrame().activeGraph.id
    }

    if(server.parameters){
      const dialogRef = this.dialog.open(InputDialogComponent,{data: server});

      dialogRef.afterClosed().subscribe(customParameters => {
        if (!customParameters) {
           return;
        }
        this.evaluate(server,  Object.assign(param,customParameters));
      });
      // this.evaluate(server,data);
    }else{
      this.evaluate(server,param);
    }

  }

  evaluate(server:JsonEvalServer, param: any){
    const dialogRef = this.dialog.open(ReplacementDialogComponent,{data: {server,param} });

    dialogRef.afterClosed().subscribe(modifications => {
      this.graphService.triggerComponentEvent(ComponentEventType.DRAW);
    });
  }
}
