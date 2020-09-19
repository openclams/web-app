import {Directive, HostListener} from '@angular/core';
import {GraphService} from '../../graph.service';
import {GraphEventType} from '../../events/graph-event-type';

@Directive({
  selector: '[appGraphKeyHandler]'
})
export class GraphKeyHandlerDirective {
  constructor(private graphService: GraphService) { }

  @HostListener('keydown.delete', ['$event'])
  onDelete(event: KeyboardEvent) {
    this.graphService.triggerGraphEvent(GraphEventType.REMOVE_SELECTION);
  }
}
