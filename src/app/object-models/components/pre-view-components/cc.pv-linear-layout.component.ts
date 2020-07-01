import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ExtendedComponentClass, PreviewComponentClass} from '../../model.classes';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {ViewControlService} from '../../../shared/services/view-control.service';

@Component({
  selector: 'cc-preview-linear-layout',
  template: `
    <ng-container #container>Linear layout</ng-container>
  `,
})
export class CCPVLinearLayoutComponent extends PreviewComponentClass implements AfterViewInit {
  blueprint = new Map<string, string>([
    ['padding', '50px'],
    ['border', 'black dotted 1px'],
  ]);

  constructor( public el: ElementRef ) {
    super();
  }

  ngAfterViewInit() {
    this.styleApplier();
  }
}
