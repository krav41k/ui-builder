import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

import {MatFormField} from '@angular/material/form-field';

import {PreviewComponent} from '../class models/preview.component';

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
}
