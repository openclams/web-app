import { ElementEventType } from './element-event-type';
import Element from '../clams-ts/model/graphs/sequence-diagram/element';

export interface ElementEvent {
    type: ElementEventType;
    element: Element;
}
