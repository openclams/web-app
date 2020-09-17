import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Graph from 'src/app/clams-ts/model/graphs/graph';
import { ProjectService } from 'src/app/project.service';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { CreateGraphDialogComponent } from './create-graph-dialog/create-graph-dialog.component';
import SequenceDiagram from 'src/app/clams-ts/model/graphs/sequence-diagram/sequence-diagram';
import UserProfile from 'src/app/clams-ts/model/graphs/user-profile/user-profile';
import { GraphService } from 'src/app/graph.service';
import { GraphEventType } from 'src/app/events/graph-event-type';
import { EditGraphDialogComponent } from './edit-graph-dialog/edit-graph-dialog.component';
import { CdkDragDrop, moveItemInArray, CdkDragSortEvent } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.css']
})
export class GraphListComponent implements OnInit {

  displayedColumns: string[] = ['drag', 'type', 'name', 'actions'];
  dataSource: MatTableDataSource<Graph>;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private projectService: ProjectService,
              private graphService: GraphService) {
    this.dataSource = new MatTableDataSource(this.getGraphs());
  }

  ngOnInit() {
    console.log('Init graph listners for list');
    Object.values(GraphEventType).forEach(type => {
      if (isNaN(Number(type))) { return; }
      this.graphService.addGraphListener(Number(type), () => {
        this.dataSource.data = this.getGraphs();
      });
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  isOpen(graph: Graph) {
    return this.projectService.isGraphOpen(graph);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openGraph(graph: Graph) {
    this.graphService.triggerGraphEvent(GraphEventType.OPEN, graph);
  }

  getGraphs(): Graph[] {
    return this.projectService.project.model.graphs;
  }

  isSequenceDiagram(graph: Graph): boolean {
    return graph instanceof SequenceDiagram;
  }

  deleteGraph(graph: Graph) {
    this.graphService.triggerGraphEvent(GraphEventType.REMOVE, graph);
  }

  editGraph(graph: Graph) {
    console.log('Edit Graph Event');
    const dialogRef = this.dialog.open(EditGraphDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      graph.name = result.name;
      this.graphService.triggerGraphEvent(GraphEventType.CHANGED, graph);
    });
  }

  /**
   * Update the position marker within the sequence diagrams
   * @param dragEvent Mouse drag event
   */
  drag(graph: Graph): void {
    this.graphService.triggerGraphEvent(GraphEventType.DRAGGING, graph);
  }

  drop(event: CdkDragDrop<Graph[]>) {
    const graph = event.item.data as Graph;
    moveItemInArray(this.getGraphs(), event.previousIndex, event.currentIndex);
    this.dataSource.data = this.getGraphs();
    this.graphService.triggerGraphEvent(GraphEventType.DRAG_END, graph);
  }
}

