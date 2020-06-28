import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {DraggableDirective} from './draggable.directive';

@Directive({
  selector: '[cdViewDraggable]',
  exportAs: 'cdViewDraggable'
})
export class CDViewDraggableDirective extends DraggableDirective implements OnInit, OnDestroy {

  constructor(public element: ElementRef) {
    super(element);
  }

  ngOnInit(): void {
    console.log('directive applied');
  }

  ngOnDestroy(): void {}
}
