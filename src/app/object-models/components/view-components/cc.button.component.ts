import {
  AfterViewInit,
  Component,
  ElementRef, OnInit,
} from '@angular/core';
import {SimpleComponentClass} from '../../model.classes';
import {ViewControlService} from '../../../shared/services/view-control.service';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cc-button',
  template: `
      <div draggable="true" [ngSwitch]="this.selfComponent.flexComponentData.get('matButton').value">

          <button
                  *ngSwitchCase="'button'"
                  mat-button
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
                  #coveredComponent
          >button
          </button>

          <button
                  *ngSwitchCase="'raisedButton'"
                  mat-raised-button
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
                  #coveredComponent
          >button
          </button>

          <button
                  *ngSwitchCase="'stokedButton'"
                  mat-stroked-button
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
                  #coveredComponent
          >button
          </button>

          <button
                  *ngSwitchCase="'flatButton'"
                  mat-flat-button
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
                  #coveredComponent
          >button
          </button>

          <button
                  *ngSwitchCase="'iconButton'"
                  mat-icon-button
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
                  #coveredComponent
          >button
          </button>

          <button
                  *ngSwitchCase="'fabButton'"
                  mat-fab
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
                  #coveredComponent
          >button
          </button>

          <button
                  *ngSwitchCase="'miniFabButton'"
                  mat-mini-fab
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
                  #coveredComponent
          >button
          </button>
      </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCButtonComponent extends SimpleComponentClass implements OnInit, AfterViewInit {

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
        ['matButton', {value: 'raisedButton', inputType: 'select', availableValue: [
            'button',
            'raisedButton',
            'stokedButton',
            'flatButton',
            'iconButton',
            'fabButton',
            'miniFabButton'
          ]}]
      ]);
    }
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessing();
  }
}
