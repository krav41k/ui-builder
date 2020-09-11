import {Component, ElementRef, OnInit} from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {SimpleComponent} from '../class models/simple.component';

@Component({
  selector: 'cc-checkbox',
  template: `
    <div
      cdkDrag
      (cdkDragMoved)="onCdkDragMove($event)"
      [cdkDragData]="selfComponent">

      <mat-checkbox
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

        [disabled]="selfComponent.flexComponentData.get('disabled').value"
        [indeterminate]="selfComponent.flexComponentData.get('indeterminate').value"
        [checked]="selfComponent.flexComponentData.get('checked').value"
        [color]="selfComponent.flexComponentData.get('color').value"
        [labelPosition]="selfComponent.flexComponentData.get('labelPosition').value"
        (change)="selfComponent.flexComponentData.get('checked').value = $event.checked"
        #coveredComponent>
        <ub-capacity
          [type]="this.selfComponent.flexComponentData.get('capacityType').value"
          [data]="this.selfComponent.flexComponentData.get('capacityData').value"
        ></ub-capacity>
      </mat-checkbox>
    </div>
  `
})
export class CCCheckboxComponent  extends SimpleComponent implements OnInit {
  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([]);

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
        ['disabled', {value: false, inputType: 'boolean'}],
        ['indeterminate', {value: false, inputType: 'boolean'}],
        ['checked', {value: false, inputType: 'boolean'}],
        ['color', {value: 'primary', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
        ['labelPosition', {value: 'before', inputType: 'select', availableValues: ['labelPosition', 'after']}],
        ['capacityType', {value: 'text', inputType: 'select', availableValues: ['text', 'icon']}],
        ['capacityData', {value: 'slide toggle', inputType: 'string'}],
      ]);
    }
  }
}
