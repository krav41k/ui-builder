import {Component, ComponentFactoryResolver, ElementRef} from '@angular/core';
import {ExtendedComponent} from '../class models/extended.component';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';

@Component({
  selector: 'cc-drag-zone',
  template: `
    <div
      #container>
        <ng-container #insertPoint>
        </ng-container>
    </div>`
})
export class CCDragZoneComponent  extends ExtendedComponent {

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
}
