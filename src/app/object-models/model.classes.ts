import {ComponentFactoryResolver, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';

export interface ModelInterface {
  parent;
  type;
  name: string;
  id: number;
  level: number;
  componentRef?;

  style?: string;
  flexData?: any;
}

export class SimpleModelClass implements ModelInterface {
  style;

  constructor(public parent: ModelInterface, public type, public id: number, public name, public level) {}
}

export class ExtendedModelClass implements ModelInterface {
  style;
  subObjectsList = new Map<number, any>();
  order = [];
  componentRef;
  nestedSwitch = true;

  constructor(public parent: ModelInterface, public type, public id: number, public name, public level) {}

  addObject(obj: ModelInterface, id) {
    this.subObjectsList.set(id, obj);
    this.order.push(id);
    this.componentRef.instance.addComponent = {id, comp: obj};
  }
}

export class SimpleComponentClass {
  el;
  selfComponent: SimpleModelClass;
  blueprint;

  @Input() set component(component: ExtendedModelClass) {
    this.selfComponent = component;
    // this.styleApplier();
  }

  styleApplier() {
    if (this.selfComponent !== undefined) {
      if (this.selfComponent.style === undefined) {
        for (const item of this.blueprint) {
          this.el.nativeElement.style[item[0]] = item[1];
        }
        this.selfComponent.style = this.el.nativeElement.style.cssText;
      } else {
        this.el.nativeElement.style.cssText = this.selfComponent.style;
      }
    } else {
      for (const item of this.blueprint) {
        this.el.nativeElement.style[item[0]] = item[1];
      }
    }
  }
}

export class ExtendedComponentClass extends SimpleComponentClass {
  selfComponent: ExtendedModelClass;
  container;

  @Input() set component(component: ExtendedModelClass) {
    this.selfComponent = component;

    super.styleApplier();
    // if (typeof component.order !== 'undefined') {
    //   this.rerender();
    // }
  }

  @Input() set addComponent(newComponent: ModelInterface) {
    this.render(newComponent);
  }

  @HostListener('pointerup') onPointerUp() {
    if (this.componentsSS.newComponentCell === null) {
      this.componentsSS.onWedding(this.selfComponent.id);
    }
  }

  constructor(private resolver: ComponentFactoryResolver, private componentsSS: ComponentsStorageService, public el: ElementRef) {
    super();
  }

  async rerender() {
    const component = this.selfComponent;
    if (component.order.length >= 0) {
      await this.container.clear();
      for (const id of component.order) {
        const comp = component.subObjectsList.get(id);
        this.render({id, comp});
      }
    }
  }

  render(item) {
    const factory = this.resolver.resolveComponentFactory(item.comp.type);
    item.comp.componentRef = this.container.createComponent(factory);
    item.comp.componentRef.instance.component = item.comp;
    this.componentsSS.bindUpdate(item.id, item.comp);
  }
}

