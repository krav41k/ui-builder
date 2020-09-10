import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {PreviewComponent} from '../class models/preview.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'cc-preview-button',
  template: `
    <button mat-raised-button>
      button
    </button>
  `,
})
export class CCPVButtonComponent extends PreviewComponent implements AfterViewInit {
  @ViewChild(MatButton, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
