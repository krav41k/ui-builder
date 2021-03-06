import {Component, ElementRef, OnInit} from '@angular/core';
import {SimpleComponent} from '../class models/simple.component';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'cc-radio-button',
  template: `
    <div
      cdkDrag
      (cdkDragMoved)="onCdkDragMove($event)"
      [cdkDragData]="selfComponent">
      <mat-radio-group
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.angularMaterialData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.angularMaterialData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.angularMaterialData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.angularMaterialData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.angularMaterialData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.angularMaterialData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.angularMaterialData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.angularMaterialData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.angularMaterialData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.angularMaterialData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.angularMaterialData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.angularMaterialData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.angularMaterialData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.angularMaterialData.get('tooltipPosition').value"

        [color]="selfComponent.flexComponentData.get('color').value"
        [disabled]="selfComponent.flexComponentData.get('disabled').value"
        [labelPosition]="selfComponent.flexComponentData.get('labelPosition').value"
        #coveredComponent
      >
        <mat-radio-button *ngFor="let option of selfComponent.flexComponentData.get('content').value; index as i" [value]="i">
          {{option.name}}
        </mat-radio-button>
      </mat-radio-group>
    </div>
  `
})
export class CCRadioButtonComponent extends SimpleComponent implements OnInit {
  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([
    // ['backgroundColor', 'red']
  ]);

  constructor(
    componentsStorageService: ComponentsStorageService,
    el: ElementRef,
    sanitizer: DomSanitizer,
    snackBar: MatSnackBar
  ) {
    super(componentsStorageService, el, sanitizer, snackBar);
  }

  ngOnInit(): void {
    if (this.selfComponent.flexComponentData === undefined) {
      this.selfComponent.flexComponentData = new Map<string, any>([
        ['content', {
          value: [
            {name: 'option'},
          ],
          prefix: 'radioButton',
          inputType: 'insert',
          operationName: 'add radio button',
          requiredFields: [{value: 'option', name: 'name', inputType: 'string'}]
        }],
        ['color', {value: 'primary', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
        ['disabled', {value: false, inputType: 'boolean'}],
        ['labelPosition', {value: '', inputType: 'select', availableValues: ['before', 'after']}],
      ]);
    }
  }
}
