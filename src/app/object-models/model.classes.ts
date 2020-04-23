import {ComponentFactoryResolver, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';

export interface ModelInterface {
  parent;
  type;
  name: string;
  id: number;
  level: number;
  componentRef?;

  style?: CSSStyleDeclaration;
}

export class SimpleModelClass implements ModelInterface {
  constructor(public parent: ModelInterface, public type, public id: number, public name, public level) {}
}

export class ExtendedModelClass implements ModelInterface {
  subObjectsList = new Map<number, any>();
  order = [];
  componentRef;

  constructor(public parent: ModelInterface, public type, public id: number, public name, public level) {}

  addObject(obj: ModelInterface, id) {
    this.subObjectsList.set(id, obj);
    this.order.push(id);
    this.componentRef.instance.addComponent = [id, obj];
  }
}

export class SimpleComponentClass {
  blueprint;

  @Input() set component(component: ExtendedModelClass) {
    this.styleApplier(component);
  }

  constructor(public el: ElementRef) {}

  styleApplier(component) {
    if (component.style === undefined) {
      for (const item of this.blueprint) {
        this.el.nativeElement.style[item[0]] = item[1];
      }
      component.style = this.el.nativeElement.style;
    } else {
      this.el.nativeElement.style = component.style;
    }
  }
}

export class ExtendedComponentClass extends SimpleComponentClass {
  selfComponent: ExtendedModelClass;
  container;

  @Input() set component(component: ExtendedModelClass) {
    super.styleApplier(component);

    this.selfComponent = component;
    if (typeof component.order !== 'undefined') {
      if (component.order.length > 0) {
        this.container.clear();
        for (const id of component.order) {
          const item = component.subObjectsList.get(id);
          this.render(item);
        }
      }
    }
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
    super(el);
  }

  render(item) {
    const factory = this.resolver.resolveComponentFactory(item[1].type);
    item[1].componentRef = this.container.createComponent(factory);
    item[1].componentRef.instance.component = item[1];
    this.componentsSS.bindUpdate(item[0], item[1]);
  }
}

