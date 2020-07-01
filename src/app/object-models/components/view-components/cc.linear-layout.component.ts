import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostListener, ViewChild, ViewContainerRef} from '@angular/core';
import {ExtendedComponentClass} from '../../model.classes';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {ViewControlService} from '../../../shared/services/view-control.service';

@Component({
  selector: 'cc-linear-layout',
  template: `
    <div appDraggable>
      <ng-container #container></ng-container>

      <cc-preview-linear-layout *cdDraggableHelper></cc-preview-linear-layout>
    </div>
  `,
})
export class CCLinearLayoutComponent extends ExtendedComponentClass implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container;
  blueprint = new Map<string, string>([
    ['width', '100%'],
    ['height', '100%'],
    ['backgroundColor', 'white'],
    ['display', 'flex'],
    ['flexDirection', 'row']
  ]);

  constructor(
    public el: ElementRef,
    resolver: ComponentFactoryResolver,
    componentsSS: ComponentsStorageService,
    viewControlService: ViewControlService) {

    super(resolver, componentsSS, el, viewControlService);
  }

  ngAfterViewInit() {
    this.styleProcessor();
    if (this.selfComponent !== undefined) {
      if (this.selfComponent.order !== undefined) {
          this.rerender().then();
      }
    }
  }
}
