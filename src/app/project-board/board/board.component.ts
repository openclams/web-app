import { Component, OnInit, Input} from '@angular/core';
import {Graph} from '@openclams/clams-ml';
import { GraphService } from 'src/app/graph.service';
import { GraphEventType } from 'src/app/events/graph-event-type';
import Frame from 'src/app/model/frame';
import { UserProfileService } from 'src/app/graphs/user-profile.service';
import {UserProfile} from '@openclams/clams-ml';
import {SequenceDiagram} from '@openclams/clams-ml';
import { SequenceDiagramService } from 'src/app/graphs/sequence-diagram.service';
import { ElementEventType } from 'src/app/events/element-event-type';
import {Element} from '@openclams/clams-ml';
import {GraphKeyHandlerService} from '../../graph-key-handler.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() frame: Frame;

  element: Element;
  showInfo: boolean;
  closeButtonHoverIndex: number;

  constructor(private graphService: GraphService,
              private userProfileService: UserProfileService,
              private sequenceDiagramService: SequenceDiagramService,
              private graphKeyHandler: GraphKeyHandlerService,
    ) {
      this.closeButtonHoverIndex = -1;
      this.showInfo = false;
   }

  ngOnInit() {
    this.graphService.addGraphListener(GraphEventType.REMOVED, graph => {
      this.closeGraph(graph);
    });
    this.graphService.addGraphListener(GraphEventType.CLOSED, graph => {
      this.closeGraph(graph);
    });

    this.graphService.addGraphListener(GraphEventType.OPEN, graph => {
      this.setActiveGraph(graph);
    });
    this.graphService.addGraphListener(GraphEventType.NEW, graph => {
      this.setActiveGraph(graph);
    });

    this.graphService.addElementListener(ElementEventType.SHOW_DETAILS, element => {
      this.showInfo = true;
      this.element = element;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.activateGraph();
  }

  activateGraph() {
    this.userProfileService.disable();
    this.sequenceDiagramService.disable();
    if (this.frame.activeGraph instanceof UserProfile) {
      this.userProfileService.set(this.frame.activeGraph);
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

  graphKeyHandlerActive(to: boolean) {
    this.graphKeyHandler.active = to
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
    this.graphService.triggerGraphEvent(GraphEventType.CLOSED, graph);
  }

  closeInfo() {
    this.showInfo = false;
    this.element = null;
  }

  getZoomLevelOfGraph(id: string): number {
    return 0;
    // return this.sequenceRegistry.getGraphById(id).userSettings.zoom * 100;
  }
}
