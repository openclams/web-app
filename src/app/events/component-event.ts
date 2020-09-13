import { ComponentEventType } from './component-event-type';
import Component from '../clams-ts/model/service-catalog/component';
import Element from '../clams-ts/model/graphs/sequence-diagram/element';

export interface ComponentEvent {
    type: ComponentEventType;
    component: Component;
    element?: Element;
}
