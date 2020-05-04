import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SimpleComponentClass} from '../model.classes';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'cc-button',
  template: `
    <button mat-raised-button>button</button>
  `,
})
export class CCButtonComponent extends SimpleComponentClass implements AfterViewInit {
  @ViewChild(MatButton, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.styleApplier();
  }
}
