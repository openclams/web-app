import { Component, Input, OnInit } from '@angular/core';
import { Message } from '@openclams/clams-ml';
import { GraphService } from 'src/app/graph.service';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-edge-properties',
  templateUrl: './edge-properties.component.html',
  styleUrls: ['./edge-properties.component.css']
})
export class EdgePropertiesComponent implements OnInit {

  @Input() message: Message;

  name: string;

  constructor(private projectService: ProjectService, private graphService: GraphService) { }

  ngOnInit(): void {
      this.name = this.message.type.getAttribute('name').value
  }

}
