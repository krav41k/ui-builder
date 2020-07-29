import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PreviewComponentClass} from '../../model.classes';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'cc-preview-autocomplete',
  template: `
    <mat-checkbox></mat-checkbox>
  `
})
export class CCPVCheckboxComponent extends PreviewComponentClass implements AfterViewInit {
  @ViewChild(MatCheckbox, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
