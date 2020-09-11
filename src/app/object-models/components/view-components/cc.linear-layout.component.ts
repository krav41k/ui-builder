import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
} from '@angular/core';

import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {ExtendedComponent} from '../class models/extended.component';

@Component({
  selector: 'cc-linear-layout',
  template: `
    <div
      [id]="this.componentsSS.dropZoneIdPrefix + selfComponent.id"
      cdkDrag
      (cdkDragMoved)="onCdkDragMove($event)"
      [cdkDragDisabled]="!selfComponent.parent"
      cdkDropList
      [cdkDropListConnectedTo]="componentsSS.dropZonesIdArray"
      cdkDropListOrientation="vertical"
      [cdkDropListData]="selfComponent"
      (cdkDropListDropped)="extendedDrop($event)"
      #container>
      <ng-container #insertPoint>
      </ng-container>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCLinearLayoutComponent extends ExtendedComponent {

  blueprint = new Map<string, string>([
    ['width', '100%'],
    ['height', '100%'],
    ['backgroundColor', 'white'],
  ]);
  secondaryBlueprint = new Map<string, string>([
    ['width', '100%'],
    ['height', '100%'],
    ['backgroundColor', 'white'],
    ['display', 'flex'],
    ['flexDirection', 'column']
  ]);

  constructor(
    el: ElementRef,
    resolver: ComponentFactoryResolver,
    componentsSS: ComponentsStorageService
  ) {
    super(el, resolver, componentsSS);
  }

  extendedDrop(event: CdkDragDrop<any>) {
    if (event.item.data) {
      const droppedCompRef = event.item.data.componentRef.instance;

      this.drop(event);

      droppedCompRef.processProperty('main', 'position', 'static');
      droppedCompRef.processProperty('main', 'top', '0');
      droppedCompRef.processProperty('main', 'left', '0');
    }
  }
}
