import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PreviewComponent} from '../class models/preview.component';
import {MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'cc-preview-radio-button',
  template: `
    <mat-radio-group>
      <mat-radio-button>Option</mat-radio-button>
    </mat-radio-group>
  `
})
export class CCPVRadioButtonComponent extends PreviewComponent implements AfterViewInit {
  @ViewChild(MatRadioGroup, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
