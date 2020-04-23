import {AfterContentInit, ContentChildren, Directive, ElementRef, Host} from '@angular/core';
import {DraggableDirective} from './draggable.directive';

@Directive({
  selector: '[cdSortable]'
})
export class CDSortableDirective extends DraggableDirective {}
