import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PreviewComponent} from '../class models/preview.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'cc-preview-slider',
  template: `
    <mat-slide-toggle>
      slide toggle
    </mat-slide-toggle>
  `
})
export class CCPVSlideToggleComponent extends PreviewComponent implements AfterViewInit {
  @ViewChild(MatSlideToggle, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
