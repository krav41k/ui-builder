import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PreviewComponent} from '../class models/preview.component';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'cc-preview-autocomplete',
  template: `
    <mat-checkbox></mat-checkbox>
  `
})
export class CCPVCheckboxComponent extends PreviewComponent implements AfterViewInit {
  @ViewChild(MatCheckbox, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
