import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef, EventEmitter, HostListener, Output, Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ExtendedComponentClass} from '../../model.classes';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {ViewControlService} from '../../../shared/services/view-control.service';

@Component({
  selector: 'cc-linear-layout',
  template: `
      <ng-container #container>
      </ng-container>

<!--      <cc-preview-linear-layout-->
<!--        *cdDraggableHelper="null;dragMove: dragMove;dragEnd: dragEnd"-->
<!--      ></cc-preview-linear-layout>-->
  `,
  styleUrls: ['./style.scss']
})
export class CCLinearLayoutComponent extends ExtendedComponentClass implements AfterViewInit {

  @ViewChild('container', { read: ViewContainerRef }) containerRef;
  blueprint = new Map<string, string>([
    ['width', '100%'],
    ['height', '100%'],
    ['backgroundColor', 'white'],
    ['display', 'flex'],
    ['flexDirection', 'row']
  ]);

  constructor(
    resolver: ComponentFactoryResolver,
    componentsSS: ComponentsStorageService,
    viewControlService: ViewControlService,
    public el: ElementRef
  ) {
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
