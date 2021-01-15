import {Component, ElementRef, OnInit} from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {SimpleComponent} from '../class models/simple.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'cc-slide-toggle',
  template: `
    <div
      cdkDrag
      (cdkDragMoved)="onCdkDragMove($event)"
      [cdkDragData]="selfComponent">
      <mat-slide-toggle
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

        [color]="this.selfComponent.flexComponentData.get('color').value"
        [aria-label]="this.selfComponent.flexComponentData.get('arialLabel').value"
        [aria-labelledby]="this.selfComponent.flexComponentData.get('arialLabelledby').value"
        [checked]="this.selfComponent.flexComponentData.get('checked').value"
        [disableRipple]="this.selfComponent.flexComponentData.get('disableRipple').value"
        [labelPosition]="this.selfComponent.flexComponentData.get('labelPosition').value"

        #coveredComponent
      >
        <ub-capacity
          [type]="this.selfComponent.flexComponentData.get('capacityType').value"
          [data]="this.selfComponent.flexComponentData.get('capacityData').value"
        ></ub-capacity>
      </mat-slide-toggle>
    </div>
  `
})
export class CCSlideToggleComponent extends SimpleComponent implements OnInit {
  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([]);

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
        ['color', {value: 'primary', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
        ['arialLabel', {value: '', inputType: 'string'}],
        ['arialLabelledby', {value: '', inputType: 'string'}],
        ['checked', {value: false, inputType: 'boolean'}],
        ['disableRipple', {value: false, inputType: 'boolean'}],
        ['labelPosition', {value: 'before', inputType: 'select', availableValues: ['before', 'after']}],
        ['capacityType', {value: 'text', inputType: 'select', availableValues: ['text', 'icon']}],
        ['capacityData', {value: 'slide toggle', inputType: 'string'}],
      ]);
    }
  }
}
