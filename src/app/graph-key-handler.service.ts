import {Injectable} from '@angular/core';
import {GraphService} from './graph.service';
import {GraphEventType} from './events/graph-event-type';

@Injectable({
  providedIn: 'root'
})
export class GraphKeyHandlerService {
  private _active = false;

  constructor(private graphService: GraphService) {
  }

  set active(setTo: boolean) {
    this._active = setTo
  }

  onDelete(keyEvent: KeyboardEvent) {
    if (this._active) {
      this.graphService.triggerGraphEvent(GraphEventType.REMOVE_SELECTION);
    }
  }
}
