import {
  Component,
  ElementRef, OnInit,
} from '@angular/core';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CdkDragMove, CdkDragStart} from '@angular/cdk/drag-drop';
import {SimpleComponent} from '../class models/simple.component';

@Component({
  selector: 'cc-button',
  template: `
    <div
        cdkDrag
        (cdkDragMoved)="onCdkDragMove($event)"
        [cdkDragData]="selfComponent"
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
export class CCButtonComponent extends SimpleComponent implements OnInit {

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

  onCdkDragMove(event: CdkDragMove<any>) {
    if (this.startPointer) {
      this.pointer = event.pointerPosition;
    } else {
      this.startPointer = event.pointerPosition;

    }
  }
}
