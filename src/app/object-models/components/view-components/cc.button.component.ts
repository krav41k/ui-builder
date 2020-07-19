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
    <div draggable="true" [ngSwitch]="this.selfComponent.flexData.get('matButton').value">

      <button
        *ngSwitchCase="'button'"
        mat-button
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.flexData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.flexData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.flexData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.flexData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.flexData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.flexData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.flexData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.flexData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.flexData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.flexData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.flexData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.flexData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.flexData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.flexData.get('tooltipPosition').value"
        #coveredComponent
      >button</button>

      <button
        *ngSwitchCase="'raisedButton'"
        mat-raised-button
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.flexData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.flexData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.flexData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.flexData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.flexData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.flexData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.flexData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.flexData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.flexData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.flexData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.flexData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.flexData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.flexData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.flexData.get('tooltipPosition').value"
        #coveredComponent
      >button</button>

      <button
        *ngSwitchCase="'stokedButton'"
        mat-stroked-button
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.flexData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.flexData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.flexData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.flexData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.flexData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.flexData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.flexData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.flexData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.flexData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.flexData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.flexData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.flexData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.flexData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.flexData.get('tooltipPosition').value"
        #coveredComponent
      >button</button>

      <button
        *ngSwitchCase="'fatButton'"
        mat-flat-button
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.flexData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.flexData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.flexData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.flexData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.flexData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.flexData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.flexData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.flexData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.flexData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.flexData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.flexData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.flexData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.flexData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.flexData.get('tooltipPosition').value"
        #coveredComponent
      >button</button>

      <button
        *ngSwitchCase="'iconButton'"
        mat-icon-button
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.flexData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.flexData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.flexData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.flexData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.flexData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.flexData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.flexData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.flexData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.flexData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.flexData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.flexData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.flexData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.flexData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.flexData.get('tooltipPosition').value"
        #coveredComponent
      >button</button>

      <button
        *ngSwitchCase="'fabButton'"
        mat-fab
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.flexData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.flexData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.flexData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.flexData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.flexData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.flexData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.flexData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.flexData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.flexData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.flexData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.flexData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.flexData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.flexData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.flexData.get('tooltipPosition').value"
        #coveredComponent
      >button</button>

      <button
        *ngSwitchCase="'miniFabButton'"
        mat-mini-fab
        (click)="openSnackBar()"
        [matBadge]="this.selfComponent.flexData.get('badgeMessage').value"
        [matBadgeColor]="this.selfComponent.flexData.get('badgeColor').value"
        [matBadgeDisabled]="this.selfComponent.flexData.get('badgeDisabled').value"
        [matBadgeOverlap]="this.selfComponent.flexData.get('badgeOverlap').value"
        [matBadgePosition]="this.selfComponent.flexData.get('badgePosition').value"
        [matBadgeSize]="this.selfComponent.flexData.get('badgeSize').value"
        matRipple
        [matRippleDisabled]="this.selfComponent.flexData.get('rippleDisabled').value"
        [matRippleAnimation]="this.selfComponent.flexData.get('rippleAnimation').value"
        [matRippleUnbounded]="this.selfComponent.flexData.get('rippleUnbounded').value"
        [matRippleRadius]="this.selfComponent.flexData.get('rippleRadius').value"
        [matRippleColor]="this.selfComponent.flexData.get('rippleColor').value"

        [matTooltip]="this.selfComponent.flexData.get('tooltipMessage').value"
        [matTooltipDisabled]="this.selfComponent.flexData.get('tooltipDisabled').value"
        [matTooltipPosition]="this.selfComponent.flexData.get('tooltipPosition').value"
        #coveredComponent
      >button</button>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCButtonComponent extends SimpleComponentClass implements OnInit, AfterViewInit {

  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([
    ['backgroundColor', 'red']
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
    this.selfComponent.flexData.set('matButton', {value: 'raisedButton', availableValue: [
        'button',
        'raisedButton',
        'stokedButton',
        'flatButton',
        'iconButton',
        'fabButton',
        'miniFabButton'
      ]});
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessor();
  }
}
