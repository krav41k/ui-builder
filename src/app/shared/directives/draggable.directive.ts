import {Directive, EventEmitter, HostListener, Output, OnInit} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  dragging = false;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('pointerdown', ['$event'])
  private onPointerDown(event: PointerEvent): void {
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
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);
  }
}
