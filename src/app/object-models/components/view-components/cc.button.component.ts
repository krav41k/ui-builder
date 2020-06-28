import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {SimpleComponentClass} from '../../model.classes';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'cc-button',
  template: `
    <button mat-raised-button cdViewDraggable>
      button

      <div *cdDraggableHelper style="background-color: black; width: 100px">
        test1
      </div>
    </button>
  `,
})
export class CCButtonComponent extends SimpleComponentClass implements AfterViewInit {
  @ViewChild(MatButton, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.styleApplier();
  }
}
