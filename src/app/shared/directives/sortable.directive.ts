import {AfterContentInit, AfterViewInit, ContentChild, Directive, ViewChild} from '@angular/core';
import {ContentObserver} from '@angular/cdk/observers';
import {DraggableDirective} from './draggable.directive';

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective extends DraggableDirective {

}

