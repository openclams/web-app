import { Component, OnInit, Input } from '@angular/core';
import Graph from 'src/app/clams-ts/model/graphs/graph';
import { GraphService } from 'src/app/graph.service';
import { GraphEventType } from 'src/app/events/graph-event-type';
import Frame from 'src/app/model/frame';
import { UserProfileService } from 'src/app/graphs/user-profile.service';
import UserProfile from 'src/app/clams-ts/model/graphs/user-profile/user-profile';
import SequenceDiagram from 'src/app/clams-ts/model/graphs/sequence-diagram/sequence-diagram';
import { SequenceDiagramService } from 'src/app/graphs/sequence-diagram.service';
import { ElementEventType } from 'src/app/events/element-event-type';
import Element from 'src/app/clams-ts/model/graphs/sequence-diagram/element';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  element: Element;

  @Input() frame: Frame;

  showInfo: boolean;
  closeButtonHoverIndex: number;

  constructor(private graphSeverice: GraphService,
              private userProfileServie: UserProfileService,
              private sequenceDiagramService: SequenceDiagramService
    ) {
      this.closeButtonHoverIndex = -1;
      this.showInfo = false;
   }

  ngOnInit() {
    this.graphSeverice.addGraphListener(GraphEventType.REMOVED, graph => {
      this.closeGraph(graph);
    });
    this.graphSeverice.addGraphListener(GraphEventType.CLOSED, graph => {
      this.closeGraph(graph);
    });

    this.graphSeverice.addGraphListener(GraphEventType.OPEN, graph => {
      this.setActiveGraph(graph);
    });
    this.graphSeverice.addGraphListener(GraphEventType.NEW, graph => {
      this.setActiveGraph(graph);
    });

    this.graphSeverice.addElementListener(ElementEventType.SHOW_DETAILS, element =>{
      this.showInfo = true;
      this.element = element;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.activateGraph();
  }

  activateGraph(){
    this.userProfileServie.disable();
    this.sequenceDiagramService.disable();
    if (this.frame.activeGraph instanceof UserProfile) {
      this.userProfileServie.set(this.frame.activeGraph);
    } else if (this.frame.activeGraph instanceof SequenceDiagram) {
      this.sequenceDiagramService.set(this.frame.activeGraph);
    }
  }

  setActiveGraph(graph: Graph): void {
    this.frame.activeGraph = graph;
    if (!this.frame.graphs.includes(graph)) {
      this.frame.graphs.push(graph);
    }
  }

  closeGraph(graph: Graph) {
    // Remove from frames
    const idx = this.frame.graphs.findIndex(g => g.id === graph.id);
    if (idx !== null) {
      this.frame.graphs.splice(idx, 1);
    }
  }

  /**
   * Creates graph view if graph tab has none(!), then sets the selected tab active
   * This gets called from html whenever tab is set active OR newly created
   */
  activateTab(index: number = -1) {
    if (index !== -1) {
      // tabs are bound to opened graphs
      this.frame.activeGraph = this.frame.graphs[index];
      // This method is always called then we press a tab
      this.activateGraph();
    }
  }


  getActiveGraphIndex(): number {
    const activeGraph = this.frame.activeGraph;
    if (!activeGraph) {
      return null;
    }
    return this.frame.graphs.findIndex(g => g.id === activeGraph.id);
  }


  changeButtonColor(index: number) {
    this.closeButtonHoverIndex = index;
  }


  closeTab(graph: Graph) {
    this.graphSeverice.triggerGraphEvent(GraphEventType.CLOSED, graph);
  }

  closeInfo() {
    this.showInfo = false;
  }

  getZoomLevelOfGraph(id: string): number {
    return 0;
    // return this.sequenceRegistry.getGraphById(id).userSettings.zoom * 100;
  }
}
