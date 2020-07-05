import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  ViewChild,
} from '@angular/core';
import {SimpleComponentClass} from '../../model.classes';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'cc-button',
  template: `
    <div draggable="true">
      <button mat-raised-button #coveredComponent>
        button
      </button>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCButtonComponent extends SimpleComponentClass implements AfterViewInit {

  @ViewChild(MatButton, { read: ElementRef }) el;
  @ViewChild('coveredComponent', {read: ElementRef}) set coveredComponent(element: ElementRef) {
    element.nativeElement.style.pointerEvents = 'none';
  }

  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.styleProcessor();
  }
}
