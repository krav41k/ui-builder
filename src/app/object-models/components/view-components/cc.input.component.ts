import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {SimpleComponent} from '../../model.classes';
import {ViewControlService} from '../../../shared/services/view-control.service';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cc-input',
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
export class CCInputComponent extends SimpleComponent implements OnInit {
  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([
    // ['backgroundColor', 'red']
  ]);

  constructor(
    viewControlService: ViewControlService,
    componentsStorageService: ComponentsStorageService,
    el: ElementRef,
    snackBar: MatSnackBar
  ) {
    super(viewControlService, componentsStorageService, el, snackBar);
  }

  ngOnInit(): void {
    if (this.selfComponent.flexComponentData === undefined) {
      this.selfComponent.flexComponentData = new Map<string, any>([
        ['appearance', {value: 'legacy', inputType: 'select', availableValues: ['legacy', 'standard', 'fill', 'outline']}],
        ['color', {value: 'primary', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
        ['matStartHint', {value: '', inputType: 'input'}],
        ['matEndHint', {value: '', inputType: 'input'}],
        ['matLabel', {value: '', inputType: 'input'}],
        ['placeholder', {value: '', inputType: 'input'}],
        ['inputText', {value: 'test', inputType: 'input'}],
      ]);
    }
  }
}
