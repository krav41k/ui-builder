import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';


import {MatButton} from '@angular/material/button';

import {PreviewComponent} from '../class models/preview.component';

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
}
