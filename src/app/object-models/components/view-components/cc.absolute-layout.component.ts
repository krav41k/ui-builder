import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
} from '@angular/core';

import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {ExtendedComponent} from '../class models/extended.component';

@Component({
  selector: 'cc-absolute-layout',
  template: `
    <div
      [id]="this.componentsSS.dropZoneIdPrefix + selfComponent.id"
      cdkDrag
      [cdkDragDisabled]="!selfComponent.parent"
      cdkDropList
      [cdkDropListConnectedTo]="componentsSS.dropZonesIdArray"
      [cdkDropListData]="selfComponent"
      (cdkDropListDropped)="extendedDrop($event)"
      #container>
      <ng-container #insertPoint>
      </ng-container>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCAbsoluteLayoutComponent extends ExtendedComponent {

  blueprint = new Map<string, string>([
    ['width', '100%'],
    ['height', '100%'],
  ]);
  secondaryBlueprint = new Map<string, string>([
    ['width', '100%'],
    ['height', '100%'],
    ['backgroundColor', 'white']
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
      const pointer = droppedCompRef.pointer;
      const componentBoundingClientRect = droppedCompRef.el.nativeElement.getBoundingClientRect();

      const positionOffset = {
        y: droppedCompRef.startPointer.y - componentBoundingClientRect.y,
        x: droppedCompRef.startPointer.x - componentBoundingClientRect.x
      };

      this.drop(event);

      const containerBoundingClientRect = this.el.nativeElement.getBoundingClientRect();
      const top = pointer.y - containerBoundingClientRect.y - positionOffset.y;
      const left = pointer.x - containerBoundingClientRect.x - positionOffset.x;

      droppedCompRef.processProperty('main', 'position', 'relative');
      droppedCompRef.processProperty('main', 'top', Math.round(top) + 'px');
      droppedCompRef.processProperty('main', 'left', Math.round(left) + 'px');
    }
  }
}
