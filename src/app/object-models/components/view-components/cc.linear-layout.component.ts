import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output, Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ExtendedComponent} from '../../model.classes';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {ViewControlService} from '../../../shared/services/view-control.service';

@Component({
  selector: 'cc-linear-layout',
  template: `
    <div
      [id]="'cdk-drop-list-' + selfComponent.id"
      cdkDrag
      cdkDropList
      [cdkDropListConnectedTo]="componentsSS.dropZonesIdArray"
      cdkDropListOrientation="horizontal"
      [cdkDropListData]="selfComponent"
      (cdkDropListDropped)="drop($event)"
      #container>
      <ng-container #insertPoint>
      </ng-container>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCLinearLayoutComponent extends ExtendedComponent {

  @ViewChild('container', {read: ElementRef}) containerEl: ElementRef;

  @ViewChild('insertPoint', { read: ViewContainerRef }) containerRef: ViewContainerRef;
  blueprint = new Map<string, string>([
    ['width', '100%'],
    ['height', '100%'],
    ['backgroundColor', 'white'],
    ['display', 'flex'],
    ['flexDirection', 'row']
  ]);

  constructor(
    el: ElementRef,
    resolver: ComponentFactoryResolver,
    componentsSS: ComponentsStorageService
  ) {
    super(el, resolver, componentsSS);
  }
}
