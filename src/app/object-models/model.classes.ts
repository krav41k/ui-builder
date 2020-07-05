import {ComponentFactoryResolver, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
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

  @Input() set component(component: SimpleModelClass) {
    this.selfComponent = component;
  }

  selfComponent: SimpleModelClass;

  private previousPosition: {clientX: number; clientY: number} = {clientX: 0, clientY: 0};
  private timeout;

  private dragging = false;
  dragStart = new EventEmitter<PointerEvent>();
  dragMove = new EventEmitter<PointerEvent>();
  dragEnd = new EventEmitter<PointerEvent>();

  @HostListener('pointerdown', ['$event'])
  private onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.viewControlService.dragStart(this.selfComponent);

    this.dragging = true;
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  private onPointerMove(event: PointerEvent): void {
    if (this.dragging) {
      this.dragMove.emit(event);
    }
  }

  @HostListener('document:pointerup', ['$event'])
  private onPointerUp(event) {
    if (this.dragging) {
      this.dragging = false;
      this.dragEnd.emit(event);
      this.viewControlService.onPointerUp();
    }
  }

  @HostListener('dragenter', ['$event'])
  private onDragEnter(event: DragEvent) {
    event.stopPropagation();
    if (!this.dragging) {
      this.viewControlService.dragEnter(this.selfComponent, this.el);
    }
  }

  @HostListener('dragover', ['$event'])
  private onDragOver(event: DragEvent) {
    event.stopPropagation();
    if (!this.dragging) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (this.timeout !== undefined) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(() => {
        if (this.previousPosition.clientX !== event.clientX && this.previousPosition.clientY !== event.clientY) {
          this.previousPosition = {clientX: event.clientX, clientY: event.clientY};
          this.viewControlService.dragOver(event);
        }
      }, 10);
    }
  }

  @HostListener('dragleave', ['$event'])
  private onDragLeave(event: DragEvent) {
    event.stopPropagation();
    if (!this.dragging) {
      this.viewControlService.dragClear();
    }
  }

  constructor(public viewControlService: ViewControlService) {
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

  @Input() set component(component: ExtendedModelClass) {
    this.selfComponent = component;
    // if (typeof component.order !== 'undefined') {
    //   this.rerender();
    // }
  }

  @Input() set addComponent(newComponent: ModelInterface) {
    this.render(newComponent);
  }

  selfComponent: ExtendedModelClass;
  containerRef;

  @HostListener('document:pointerup', ['$event']) onWedding(event) {
    if (this.componentsSS.newComponentCell === null) {
      this.componentsSS.onWedding(this.selfComponent.id);
      this.componentsSS.onPointerUp();
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
      await this.containerRef.clear();
      for (const id of component.order) {
        const comp = component.subObjectsList.get(id);
        this.render({id, comp});
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

