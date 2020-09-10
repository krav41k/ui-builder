import {Component, ElementRef, OnInit} from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

import {SimpleComponent} from '../class models/simple.component';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';

@Component({
  selector: 'cc-preview-autocomplete',
  template: `
    <div draggable="true">
      <mat-form-field
        [appearance]="selfComponent.flexComponentData.get('appearance').value"
        [color]="selfComponent.flexComponentData.get('color').value"
        #coveredComponent
      >
        <mat-label>{{selfComponent.flexComponentData.get('matLabel').value}}</mat-label>
        <input
          matInput
          [(ngModel)]="selfComponent.flexComponentData.get('inputText').value"
          [placeholder]="selfComponent.flexComponentData.get('placeholder').value"
        >
        <mat-hint align="start">{{selfComponent.flexComponentData.get('matStartHint').value}}</mat-hint>
        <mat-hint align="end">{{selfComponent.flexComponentData.get('matEndHint').value}}</mat-hint>
      </mat-form-field>
    </div>
  `
})
export class CCFormFieldComponent extends SimpleComponent implements OnInit {
  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([
    // ['backgroundColor', 'red']
  ]);

  constructor(
    componentsStorageService: ComponentsStorageService,
    el: ElementRef,
    snackBar: MatSnackBar
  ) {
    super(componentsStorageService, el, snackBar);
  }

  ngOnInit(): void {
    if (this.selfComponent.flexComponentData === undefined) {
      this.selfComponent.flexComponentData = new Map<string, any>([
        ['appearance', {value: 'legacy', inputType: 'select', availableValues: ['legacy', 'standard', 'fill', 'outline']}],
        ['color', {value: 'primary', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
        ['matStartHint', {value: 'hint', inputType: 'input'}],
        ['matEndHint', {value: 'hint', inputType: 'input'}],
        ['matLabel', {value: 'label', inputType: 'input'}],
        ['placeholder', {value: 'placeholder', inputType: 'input'}],
        ['inputText', {value: 'test', inputType: 'input'}],
      ]);
    }
  }
}
