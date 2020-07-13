import {ComponentFactoryResolver, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {ViewControlService} from '../shared/services/view-control.service';

export type ModelClass = SimpleModelClass | ExtendedModelClass;

export interface ModelInterface {
  parent: ExtendedModelClass;
  type;
  name: string;
  id: number;
  level: number;
  componentRef;

  flexData?: any;
}

// DataClasses:
// Simple class
export class SimpleModelClass implements ModelInterface {
  public style;
  public componentRef;
  public childStyle;

  constructor(public parent: ExtendedModelClass, public type, public id: number, public name, public level) {}
}

// Extended class
export class ExtendedModelClass extends SimpleModelClass {
  public subObjectsList = new Map<number, any>();
  public order = [];
  public nestedSwitch = true;

  constructor(parent: ExtendedModelClass, type, id: number, name, level) {
    super(parent, type, id, name, level);
  }

  addObject(obj: ModelClass, id) {
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
  selfComponent: any;

  applyStyle(el: ElementRef, blueprint) {
    for (const item of blueprint) {
      el.nativeElement.style[item[0]] = item[1];
    }
  }
}

// Simple component class
export class SimpleComponentClass extends PreviewComponentClass {

  @Input() set component(component: SimpleModelClass) {
    this.selfComponent = component;
  }

  selfComponent: SimpleModelClass;
  secondaryBlueprint;

  private previousPosition: {clientX: number; clientY: number} = {clientX: 0, clientY: 0};
  private draggingS1 = false;
  private timeoutS1;


  @ViewChild('coveredComponent', { read: ElementRef }) private childEl: ElementRef;
  @ViewChild('coveredComponent', {read: ElementRef}) private set coveredComponent(element: ElementRef) {
    element.nativeElement.style.pointerEvents = 'none';
  }

  // pointer events for directive dragging strategy
  @HostListener('pointerdown', ['$event'])
  private onDragStart(event: PointerEvent): void {
    event.stopPropagation();

    this.componentsSS.selectedComponentsSteam$.next(this.selfComponent);
    this.viewControlService.dragStart(this.selfComponent, this.el);

    this.draggingS1 = true;
  }

  // drag events for DOM dragging strategy
  @HostListener('dragenter', ['$event'])
  private onDragEnter(event: DragEvent) {
    event.stopPropagation();
    if (!this.draggingS1) {
      this.viewControlService.dragEnter(this.selfComponent, this.el);
    }
  }

  @HostListener('dragover', ['$event'])
  private onDragOver(event: DragEvent) {
    event.stopPropagation();
    if (!this.draggingS1) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (this.timeoutS1 !== undefined) {
        window.clearTimeout(this.timeoutS1);
      }
      this.timeoutS1 = window.setTimeout(() => {
        if (this.previousPosition.clientX !== event.clientX && this.previousPosition.clientY !== event.clientY) {
          this.previousPosition = {clientX: event.clientX, clientY: event.clientY};
          this.viewControlService.dragOver(event);
        }
      }, 10);
    }
  }

  @HostListener('dragexit', ['$event'])
  private onDragLeave(event: DragEvent) {
    console.log('drag exit');
    event.stopPropagation();

    if (!this.draggingS1) {
      this.viewControlService.dragClear();
    }
  }

  @HostListener('dragend', ['$event'])
  private onDragEnd(event) {
    event.stopPropagation();

    if (this.draggingS1) {
      this.viewControlService.dragEnd();
    }
  }

  constructor(public viewControlService: ViewControlService, public componentsSS: ComponentsStorageService, public el: ElementRef) {
    super();
  }

  styleProcessor() {
    if (this.selfComponent.style === undefined) {
      this.applyStyle(this.el, this.blueprint);
      this.selfComponent.style = this.el.nativeElement.style.cssText;
      console.log('test');
    } else {
      this.el.nativeElement.style.cssText = this.selfComponent.style;
    }
    if (this.selfComponent.childStyle === undefined ) {
      this.applyStyle(this.childEl, this.secondaryBlueprint);
      this.selfComponent.childStyle = this.childEl.nativeElement.style.cssText;
    } else {
      this.childEl.nativeElement.style.cssText = this.selfComponent.childStyle;
    }
  }
}

// Extended component class
export class ExtendedComponentClass extends PreviewComponentClass {

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

  private draggingS2 = false;
  private timeoutS2;
  private previousPosition: {clientX: number; clientY: number} = {clientX: 0, clientY: 0};
  dragStart = new EventEmitter<PointerEvent>();
  dragMove = new EventEmitter<PointerEvent>();
  dragEnd = new EventEmitter<PointerEvent>();

  @HostListener('pointerup') onWedding() {
    if (this.componentsSS.newComponentCell === null) {
      this.componentsSS.onWedding(this.selfComponent.id);
    }
  }

  // drag events for DOM dragging strategy
  @HostListener('dragenter', ['$event'])
  private onDragEnter(event: DragEvent) {
    event.stopPropagation();
    this.viewControlService.dragEnter(this.selfComponent, this.el);
  }

  @HostListener('dragover', ['$event'])
  private onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (this.timeoutS2 !== undefined) {
      window.clearTimeout(this.timeoutS2);
    }
    this.timeoutS2 = window.setTimeout(() => {
      if (this.previousPosition.clientX !== event.clientX && this.previousPosition.clientY !== event.clientY) {
        this.previousPosition = {clientX: event.clientX, clientY: event.clientY};
        this.viewControlService.dragOver(event);
      }
    }, 10);
  }

  @HostListener('dragexit', ['$event'])
  private onDragLeave(event: DragEvent) {
    console.log('drag exit');
    event.stopPropagation();

    this.viewControlService.dragClear();
  }

  @HostListener('dragend', ['$event'])
  private onDragEnd(event) {
    event.stopPropagation();

    this.viewControlService.dragEnd();
  }

  // // pointer events for directive dragging strategy
  @HostListener('pointerdown', ['$event'])
  private onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.componentsSS.selectedComponentsSteam$.next(this.selfComponent);
    this.viewControlService.dragStart(this.selfComponent, this.el);

    this.draggingS2 = true;
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  private onDocumentPointerMove(event: PointerEvent): void {
    if (this.draggingS2) {
      this.dragMove.emit(event);
    }
    //   if (this.timeoutS2 !== undefined) {
    //     window.clearTimeout(this.timeoutS2);
    //   }
    //   this.timeoutS2 = window.setTimeout(() => {
    //     if (this.draggingS2) {
    //       this.viewControlService.onMouseMove(event);
    //     }
    //   }, 100);
  }

  @HostListener('document:pointerup', ['$event'])
  private onDocumentPointerUp(event: PointerEvent) {
    if (this.draggingS2) {
      this.draggingS2 = false;
      this.dragEnd.emit(event);
      this.viewControlService.dragEnd(event);
    }
  }

  constructor(
    private resolver: ComponentFactoryResolver,
    public el: ElementRef,
    private viewControlService: ViewControlService,
    private componentsSS: ComponentsStorageService,
  ) {
    super();

  }

  styleProcessing() {
    if (this.selfComponent.style === undefined) {
      this.applyStyle(this.el, this.blueprint);
      this.selfComponent.style = this.el.nativeElement.style.cssText;
    } else {
      this.el.nativeElement.style.cssText = this.selfComponent.style;
    }
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

