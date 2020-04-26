import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ExtendedComponentClass} from '../model.classes';
import {ComponentsStorageService} from '../../shared/services/components-storage.service';

@Component({
  selector: 'cc-linear-layout',
  template: `
    <ng-container #container></ng-container>
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

  constructor(public el: ElementRef, resolver: ComponentFactoryResolver, componentsSS: ComponentsStorageService) {

    super(resolver, componentsSS, el);
  }

  ngAfterViewInit() {
    if (this.selfComponent !== undefined) {
      if (typeof this.selfComponent.order !== 'undefined') {
        setTimeout(() => {
          this.rerender();
        });
      }
    }
  }
}
