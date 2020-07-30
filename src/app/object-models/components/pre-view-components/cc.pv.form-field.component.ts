import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PreviewComponent} from '../../model.classes';
import {MatFormField} from '@angular/material/form-field';

@Component({
  selector: 'cc-preview-form-field',
  template: `
    <mat-form-field appearance="outline">
        <input matInput>
    </mat-form-field>
  `
})
export class CCPVFormFieldComponent extends PreviewComponent implements AfterViewInit {
  @ViewChild(MatFormField, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
