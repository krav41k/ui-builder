import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  Input, ViewChild,
  ViewContainerRef
} from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {PreviewComponent} from './preview.component';
import {ExtendedModelClass} from './extended-model.class';
import {ComponentClass, ModelInterface} from './model.interface';

@Component({
  selector: 'ub-extended-component',
  template: `
    <div></div>
  `
})
export class ExtendedComponent extends PreviewComponent implements AfterViewInit {

  @Input() set component(component: ExtendedModelClass) {
    this.selfComponent = component;
  }

  @Input() set addComponent(newComponent: ModelInterface) {
    this.render(newComponent);
  }

  @ViewChild('container', {read: ElementRef}) childEl: ElementRef;

  @ViewChild('insertPoint', { read: ViewContainerRef }) containerRef: ViewContainerRef;

  selfComponent: ExtendedModelClass;

  @HostListener('pointerup') onWedding() {
    if (this.componentsSS.newComponentCell === null) {
      this.componentsSS.onWedding(this.selfComponent.id);
    }
  }

  @HostListener('pointerdown', ['$event'])
  private onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.componentsSS.selectComponent(this.selfComponent);
  }

  constructor(
    public el: ElementRef,
    private resolver: ComponentFactoryResolver,
    public componentsSS: ComponentsStorageService,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessing();
    this.rerender().then();
  }

  drop(event: CdkDragDrop<ExtendedModelClass>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.order, event.previousIndex, event.currentIndex);
      event.container.data.componentRef.instance.rerender();
    } else {
      if (this.canBeDropped(event)) {
        const comp = event.item.data;
        const previousContainer = event.previousContainer.data;
        const container = event.container.data;

        transferArrayItem(event.previousContainer.data.order,
          event.container.data.order,
          event.previousIndex,
          event.currentIndex);
        previousContainer.subComponentsList.delete(comp.id);
        comp.parent = container;
        comp.level = comp.parent.level + 1;
        comp.parent.subComponentsList.set(comp.id, comp);
        container.componentRef.instance.rerender();
        previousContainer.componentRef.instance.rerender();
      }
    }
  }

  canBeDropped(event: CdkDragDrop<ExtendedModelClass>): boolean {
    const draggingComp = event.item.data;
    if (draggingComp instanceof ExtendedModelClass) {
      const isParent = (parent, component: ComponentClass) => {
        if (component.parent === parent) {
          return false;
        } else if (component.parent) {
          isParent(parent, component.parent);
        }
      };
    }
    return true;
  }

  async rerender() {
    const component = this.selfComponent;
    if (component.order.length >= 0) {
      await this.containerRef.clear();
      for (const id of component.order) {
        const comp = component.subComponentsList.get(id);
        this.render({comp, id});
      }
    }
  }

  render(item) {
    const factory = this.resolver.resolveComponentFactory(item.comp.type);
    item.comp.componentRef = this.containerRef.createComponent(factory);
    item.comp.componentRef.instance.component = item.comp;
    this.componentsSS.bindUpdate(item.id, item.comp);
  }
}
