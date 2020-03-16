import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDiller]'
})

export class ComponentsDillerDirective {
  @Output() dragStart = new EventEmitter();
  @Output() dragMove = new EventEmitter();
  @Output() dragEnd = new EventEmitter();
  dragging = false;

  @HostBinding('class.draggable') draggable = true;

  @HostListener('pointerdown') onPointerDown(): void {
    this.dragging = true;
    this.dragStart.emit();
  }

  @HostListener('document:pointermove') onPointerMove(): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit();
  }

  @HostListener('document:pointerup') onPointerUp(): void {
    if (!this.dragging) {
      return;
    }

    this.dragEnd.emit();
    this.dragging = false;
  }
}
