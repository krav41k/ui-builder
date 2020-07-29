import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {SimpleComponentClass} from '../../model.classes';
import {ViewControlService} from '../../../shared/services/view-control.service';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cc-slide-toggle',
  template: `
    <div draggable="true">
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

        [color]="this.selfComponent.angularMaterialData.get('color').value"
        [aria-label]="this.selfComponent.angularMaterialData.get('arialLabel').value"
        [aria-labelledby]="this.selfComponent.angularMaterialData.get('arialLabelledby').value"
        [checked]="this.selfComponent.angularMaterialData.get('checked').value"
        [disableRipple]="this.selfComponent.angularMaterialData.get('disableRipple').value"
        [labelPosition]="this.selfComponent.angularMaterialData.get('labelPosition').value"

        #coveredComponent
      >

      </mat-slide-toggle>
    </div>
  `
})
export class CCSlideToggleComponent extends SimpleComponentClass implements OnInit, AfterViewInit {
  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([]);

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
        ['color', {value: 'primary', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
        ['arialLabel', {value: '', inputType: 'string'}],
        ['arialLabelledby', {value: '', inputType: 'string'}],
        ['checked', {value: false, inputType: 'boolean'}],
        ['disableRipple', {value: false, inputType: 'boolean'}],
        ['labelPosition', {value: 'before', inputType: 'select', availableValues: ['before', 'after']}],
      ]);
    }
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessing();
  }
}
