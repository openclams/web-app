import Graph from '../clams-ts/model/graphs/graph';
import { GraphEventType } from './graph-event-type';


export interface GraphEvent {
    type: GraphEventType;
    graph: Graph;
}
