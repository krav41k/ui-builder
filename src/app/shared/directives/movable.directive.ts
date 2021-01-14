import { Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import {Boundaries} from '../interfaces/boundaries';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[cdMovable]'
})
export class MovableDirective extends DraggableDirective {

  @Input('cdOwnerComp') ownerComp;

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostBinding('class.movable') movable = true;

  position: Position = {x: 0, y: 0};
  pos: Position = {x: 0, y: 0};
  private boundaries: Boundaries;

  private startPosition: Position;

  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
    super();
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
    this.measureBoundaries();
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    this.maintainBoundaries();
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {

  }

  private measureBoundaries() {
    console.log(
      this.ownerComp.selfComponent.parent.componentRef.instance
    );
    const viewRect: ClientRect = this.ownerComp.selfComponent.parent.componentRef.instance.el.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = this.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + this.position.x,
      maxX: viewRect.right - movableClientRect.right + this.position.x,
      minY: viewRect.top - movableClientRect.top + this.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + this.position.y
    };
    console.log(viewRect);
    console.log(movableClientRect);
    console.log(this.position);
  }

  private maintainBoundaries() {
    this.position.x = Math.max(this.boundaries.minX, this.position.x);
    this.position.x = Math.min(this.boundaries.maxX, this.position.x);
    this.position.y = Math.max(this.boundaries.minY, this.position.y);
    this.position.y = Math.min(this.boundaries.maxY, this.position.y);
  }
}
