import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ExtendedComponentClass} from '../../model.classes';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';

@Component({
  selector: 'cc-linear-layout',
  template: `
    <ng-container #container>Linear layout</ng-container>
  `,
})
export class CCPVLinearLayoutComponent extends ExtendedComponentClass implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container;
  blueprint = new Map<string, string>([
    // ['padding', '50px'],
    ['minWidth', '50px'],
    ['minHeight', '50px'],
    ['border', 'black dotted 1px'],
  ]);

  constructor(public el: ElementRef, resolver: ComponentFactoryResolver, componentsSS: ComponentsStorageService) {

    super(resolver, componentsSS, el);
  }

  ngAfterViewInit() {
    this.styleApplier();
  }
}
