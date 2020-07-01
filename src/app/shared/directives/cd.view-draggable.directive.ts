import {Directive, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
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
    this.dragStart.subscribe(() => console.log('test'));
  }

  ngOnDestroy(): void {}
}
