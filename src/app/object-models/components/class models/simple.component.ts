import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild} from '@angular/core';

import {Subscription} from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';

import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {PreviewComponent} from './preview.component';
import {SimpleModelClass} from './simple-model.class';
import {CdkDragMove} from '@angular/cdk/drag-drop';

@Component({
  selector: 'ub-simple-component',
  template: `
    <div></div>
  `
})
export class SimpleComponent extends PreviewComponent implements AfterViewInit, OnDestroy {

  @Input() set component(component: SimpleModelClass) {
    this.selfComponent = component;
  }

  selfComponent: SimpleModelClass;

  subscriptions: Subscription[] = [];

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
