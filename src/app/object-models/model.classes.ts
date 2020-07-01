import {ComponentFactoryResolver, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {ViewControlService} from '../shared/services/view-control.service';

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

// DataClasses:
// Simple class
export class SimpleModelClass implements ModelInterface {
  style;

  constructor(public parent: ModelInterface, public type, public id: number, public name, public level) {}
}

// Extended class
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

// Component Classes:
// PreviewComponentClass
export class PreviewComponentClass {

  el;
  blueprint;

  styleApplier() {
    for (const item of this.blueprint) {
      this.el.nativeElement.style[item[0]] = item[1];
    }
  }
}

// Simple component class
export class SimpleComponentClass extends PreviewComponentClass {

  private timeout;
  selfComponent: SimpleModelClass;

  @Input() set component(component: SimpleModelClass) {
    this.selfComponent = component;
  }

  // @HostListener('pointerdown') onDragStart() {
  //   this.viewControlService.drag(this.selfComponent.id, this.el);
  // }
  //
  // @HostListener('dragover', ['$event']) onDragOver(event) {
  //   console.log('drag over');
  //   if (this.timeout !== undefined) {
  //     window.clearTimeout(this.timeout);
  //   }
  //   this.timeout = window.setTimeout( () => {
  //     // trigger the new event on event.target, so that it can bubble appropriately
  //     this.viewControlService.onMouseMove(event);
  //   }, 100);
  // }
  //
  // @HostListener('dragleave') onDragLeave() {
  //   console.log('drag leave');
  // }

  constructor(private viewControlService: ViewControlService) {
    super();
  }

  styleProcessor() {
    if (this.selfComponent !== undefined) {
      if (this.selfComponent.style === undefined) {
        this.styleApplier();
        this.selfComponent.style = this.el.nativeElement.style.cssText;
      } else {
        this.el.nativeElement.style.cssText = this.selfComponent.style;
      }
    } else {
      this.styleApplier();
    }
  }
}

// Extended component class
export class ExtendedComponentClass extends SimpleComponentClass {
  selfComponent: ExtendedModelClass;
  container;

  @Input() set component(component: ExtendedModelClass) {
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

  constructor(
    private resolver: ComponentFactoryResolver,
    private componentsSS: ComponentsStorageService,
    public el: ElementRef,
    viewControlService: ViewControlService,
    ) {

    super(viewControlService);
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

