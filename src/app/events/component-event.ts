import Component from '../clams-ts/model/service-catalog/component';
import { ComponentEventType } from './component-event-type';

export interface ComponentEvent {
    type: ComponentEventType;
    component: Component;
}
