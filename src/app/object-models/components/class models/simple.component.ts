import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, ViewChild} from '@angular/core';

import {Subscription} from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';

import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {PreviewComponent} from './preview.component';
import {SimpleModelClass} from './simple-model.class';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Axis} from '../../../shared/classes/axis';

@Component({
  selector: 'ub-simple-component',
  template: `
    <div></div>
  `
})
export class SimpleComponent extends PreviewComponent implements AfterViewInit, OnDestroy {

  public position: Axis = {x: 0, y: 0};

  @Input() set component(component: SimpleModelClass) {
    this.selfComponent = component;
  }

  selfComponent: SimpleModelClass;

  subscriptions: Subscription[] = [];

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @ViewChild('coveredComponent', {read: ElementRef}) private set coveredComponent(element: ElementRef) {
    if (element !== undefined) {
      this.childEl = element;

      this.subscriptions.push(this.componentsSS.eventsState$.subscribe(state => state
        ? element.nativeElement.style.pointerEvents = 'auto'
        : element.nativeElement.style.pointerEvents = 'none'
      ));
      this.compSecondaryStyleProcessing();
    }
  }

  @HostListener('pointerdown', ['$event'])
  private onDragStart(event: PointerEvent): void {
    event.stopPropagation();

    this.componentsSS.selectComponent(this.selfComponent);
  }

  constructor(
    public componentsSS: ComponentsStorageService,
    public el: ElementRef,
    private sanitizer: DomSanitizer,
    public snackBar: MatSnackBar
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessing();
  }

  ngOnDestroy(): any {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openSnackBar() {
    if (!this.selfComponent.angularMaterialData.get('snackBarDisabled').value) {
      this.snackBar.open(
        this.selfComponent.angularMaterialData.get('snackBarMessage').value,
        this.selfComponent.angularMaterialData.get('snackBarAction').value,
        {
          duration: 1000,
          horizontalPosition: this.selfComponent.angularMaterialData.get('snackBarPositionH').value,
          verticalPosition: this.selfComponent.angularMaterialData.get('snackBarPositionV').value,
        }
      );
    }
  }
}
