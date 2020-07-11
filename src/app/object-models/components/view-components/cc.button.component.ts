import {
  AfterViewInit,
  Component,
  ElementRef, HostBinding, HostListener,
  ViewChild,
} from '@angular/core';
import {SimpleComponentClass} from '../../model.classes';
import {MatButton} from '@angular/material/button';
import {ViewControlService} from '../../../shared/services/view-control.service';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';

@Component({
  selector: 'cc-button',
  template: `
    <div draggable="true">
      <button mat-raised-button #coveredComponent>
        button
      </button>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCButtonComponent extends SimpleComponentClass implements AfterViewInit {

  blueprint = new Map<string, string>([

  ]);
  secondaryBlueprint = new Map<string, string>([
    ['backgroundColor', 'red']
  ]);

  constructor(
    viewControlService: ViewControlService,
    componentsStorageService: ComponentsStorageService,
    el: ElementRef,
  ) {
    super(viewControlService, componentsStorageService, el);
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessor();
  }
}
