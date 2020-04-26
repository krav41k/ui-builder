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
    this.componentRef.instance.addComponent = {id, comp: obj};
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
    super(el);
  }

  rerender() {
    const component = this.selfComponent;
    if (component.order.length > 0) {
      this.container.clear();
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

