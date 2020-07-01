import {Directive, EventEmitter, HostBinding, HostListener, Output, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {

  @HostBinding('class.draggable') draggable;

  @HostBinding('attr.touch-action') touchAction;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.dragging') dragging;

  constructor(public element: ElementRef) {}

  ngOnInit(): void {
    this.draggable = true;
    this.touchAction = 'none';
    this.dragging = false;
    console.log(this.element);
  }

  @HostListener('pointerdown', ['$event'])
  private onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    console.log('pointer down');
    this.dragging = true;
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  private onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  private onPointerUp(event: PointerEvent): void {
    console.log('pointer up');
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);
  }
}
