import { Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import {Boundaries} from '../interfaces/boundaries';
import {Axis} from '../classes/axis';

@Directive({
  selector: '[cdMovable]'
})
export class MovableDirective extends DraggableDirective {

  @Input('cdOwnerComp') mainComp;

  @HostBinding('class.movable') movable = true;

  private boundaries: Boundaries;

  private startPosition: Axis;

  constructor(public element: ElementRef) {
    super();
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.mainComp.position.x,
      y: event.clientY - this.mainComp.position.y
    };
    this.measureBoundaries();
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    this.mainComp.position.x = event.clientX - this.startPosition.x;
    this.mainComp.position.y = event.clientY - this.startPosition.y;
    this.maintainBoundaries();
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {

  }

  private measureBoundaries() {
    const parentCompRef = this.mainComp.selfComponent.parent.componentRef;
    const viewRect: ClientRect = parentCompRef.instance.el.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = this.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + this.mainComp.position.x,
      maxX: viewRect.right - movableClientRect.right + this.mainComp.position.x,
      minY: viewRect.top - movableClientRect.top + this.mainComp.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + this.mainComp.position.y
    };
  }

  private maintainBoundaries() {
    this.mainComp.position.x = Math.min(this.boundaries.maxX, Math.max(this.boundaries.minX, this.mainComp.position.x));
    this.mainComp.position.y = Math.min(this.boundaries.maxY, Math.max(this.boundaries.minY, this.mainComp.position.y));
  }
}
