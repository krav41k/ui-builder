import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PreviewComponentClass} from '../../model.classes';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'cc-preview-slider',
  template: `
    <mat-slide-toggle>
      slide toggle
    </mat-slide-toggle>
  `
})
export class CCPVSlideToggleComponent extends PreviewComponentClass implements AfterViewInit {
  @ViewChild(MatSlideToggle, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
