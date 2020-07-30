import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PreviewComponent} from '../../model.classes';
import {MatFormField} from '@angular/material/form-field';

@Component({
  selector: 'cc-preview-autocomplete',
  template: `
    <mat-form-field>
      <input matInput type="text" placeholder="text">
    </mat-form-field>
  `
})
export class CCPVAutocompleteComponent  extends PreviewComponent implements AfterViewInit {
  @ViewChild(MatFormField, { read: ElementRef }) el;
  blueprint = new Map<string, string>([]);

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }
}
