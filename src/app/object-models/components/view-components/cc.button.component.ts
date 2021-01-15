import {
  Component,
  ElementRef, OnInit,
} from '@angular/core';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleComponent} from '../class models/simple.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'cc-button',
  template: `
    <div
        cdMovable
        [cdOwnerComp]="selfRef"
        cdkDrag
        (cdkDragMoved)="onCdkDragMove($event)"
        [cdkDragData]="selfComponent"
        cdkDragDisabled
        [ngSwitch]="this.selfComponent.flexComponentData.get('matButton').value">

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
          #coveredComponent>
          <ub-capacity
            [type]="this.selfComponent.flexComponentData.get('capacityType').value"
            [data]="this.selfComponent.flexComponentData.get('capacityData').value"
          ></ub-capacity>
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
          #coveredComponent>
          <ub-capacity
            [type]="this.selfComponent.flexComponentData.get('capacityType').value"
            [data]="this.selfComponent.flexComponentData.get('capacityData').value"
          ></ub-capacity>
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
          #coveredComponent>
          <ub-capacity
            [type]="this.selfComponent.flexComponentData.get('capacityType').value"
            [data]="this.selfComponent.flexComponentData.get('capacityData').value"
          ></ub-capacity>
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
          #coveredComponent>
          <ub-capacity
            [type]="this.selfComponent.flexComponentData.get('capacityType').value"
            [data]="this.selfComponent.flexComponentData.get('capacityData').value"
          ></ub-capacity>
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
          #coveredComponent>
          <ub-capacity
            [type]="this.selfComponent.flexComponentData.get('capacityType').value"
            [data]="this.selfComponent.flexComponentData.get('capacityData').value"
          ></ub-capacity>
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
          #coveredComponent>
          <ub-capacity
            [type]="this.selfComponent.flexComponentData.get('capacityType').value"
            [data]="this.selfComponent.flexComponentData.get('capacityData').value"
          ></ub-capacity>
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
          #coveredComponent>
          <ub-capacity
            [type]="this.selfComponent.flexComponentData.get('capacityType').value"
            [data]="this.selfComponent.flexComponentData.get('capacityData').value"
          ></ub-capacity>
        </button>
      </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCButtonComponent extends SimpleComponent implements OnInit {

  blueprint = new Map<string, string>([
    ['display', 'inline-block']
  ]);
  secondaryBlueprint = new Map<string, string>([]);

  selfRef: SimpleComponent;

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
        ['capacityType', {value: 'text', inputType: 'select', availableValues: ['text', 'icon']}],
        ['capacityData', {value: 'button', inputType: 'string'}],
        ['matButton', {value: 'raisedButton', inputType: 'select', availableValue: [
            'button',
            'raisedButton',
            'stokedButton',
            'flatButton',
            'iconButton',
            'fabButton',
            'miniFabButton'
          ]}],
      ]);
    }
    this.selfRef = this;
  }
}
