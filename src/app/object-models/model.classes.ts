import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, OnDestroy,
  ViewChild
} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {ViewControlService} from '../shared/services/view-control.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';

export type ComponentClass = SimpleModelClass | ExtendedModelClass;

export interface ModelInterface {
  parent?: ExtendedModelClass;
  type;
  name: string;
  id: number;
  level: number;
  componentRef;

  angularMaterialData?: Map<any, any>;
  flexComponentData?: Map<any, any>;
}

// DataClasses:
// Simple class
export class SimpleModelClass implements ModelInterface {
  // public style;
  public componentRef;
  angularMaterialData = new Map<string, {value: any, inputType: string, availableValues?: any}>([
    ['badge', {value: 'matBadge', inputType: 'label'}],
    ['badgeMessage', {value: '', inputType: 'string'}],
    ['badgeColor', {value: '', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
    ['badgeDisabled', {value: false, inputType: 'boolean'}],
    ['badgeOverlap', {value: false, inputType: 'boolean'}],
    ['badgePosition', {
      value: 'above',
      inputType: 'select',
      availableValues: ['above after', 'above before', 'below before', 'below after', 'before', 'after', 'above', 'below']
    }],
    ['badgeSize', {value: 'medium', inputType: 'select', availableValues: ['small', 'medium', 'large']}],

    ['ripple', {value: 'matRipple', inputType: 'label'}],
    ['rippleDisabled', {value: true, inputType: 'boolean'}],
    ['rippleAnimation', {value: true, inputType: 'boolean'}],
    ['rippleUnbounded', {value: true, inputType: 'boolean'}],
    ['rippleRadius', {value: 0, inputType: 'number'}],
    ['rippleColor', {value: '', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],

    ['snackBar', {value: 'matSnackBar', inputType: 'label'}],
    ['snackBarDisabled', {value: true, inputType: 'boolean'}],
    ['snackBarPositionH', {value: 'start', inputType: 'select', availableValues: ['start', 'center', 'end', 'left', 'right']}],
    ['snackBarPositionV', {value: 'top', inputType: 'select', availableValues: ['top', 'bottom']}],
    ['snackBarMessage', {value: 'message', inputType: 'sting'}],
    ['snackBarAction', {value: 'done', inputType: 'string'}],

    ['tooltip', {value: 'matTooltip', inputType: 'label'}],
    ['tooltipDisabled', {value: true, inputType: 'boolean'}],
    ['tooltipMessage', {value: 'message', inputType: 'string'}],
    ['tooltipPosition', {value: 'left', inputType: 'select', availableValues: ['left', 'right', 'above', 'below', 'before', 'after']}],
  ]);

  constructor(
    public type,
    public id: number,
    public name,
    public level,

    public parent?: ExtendedModelClass,
    public style?,
    public childStyle?,
    public flexComponentData?
  ) {}
}

// Extended class
export class ExtendedModelClass extends SimpleModelClass {
  public subObjectsList = new Map<number, any>();
  public order = [];
  public nestedSwitch = true;

  constructor(type, id: number, name, level, parent?: ExtendedModelClass, style?) {
    super(type, id, name, level, parent, style);
  }

  addObject(obj: ComponentClass, id) {
    this.subObjectsList.set(id, obj);
    this.order.push(id);
    this.componentRef.instance.addComponent = {comp: obj, id};
  }
}

// Component Classes:
// PreviewComponentClass
export class PreviewComponent {

  el;
  blueprint;
  selfComponent: any;

  applyStyle(el: ElementRef, blueprint) {
    for (const item of blueprint) {
      el.nativeElement.style[item[0]] = item[1];
    }
  }
}

@Component({
  selector: 'simple-component',
  template: `
    <div></div>
  `
})
export class SimpleComponent extends PreviewComponent implements AfterViewInit, OnDestroy {

  @Input() set component(component: SimpleModelClass) {
    this.selfComponent = component;
  }

  selfComponent: SimpleModelClass;
  secondaryBlueprint;

  private previousPosition: {clientX: number; clientY: number} = {clientX: 0, clientY: 0};
  private draggingS1 = false;
  private timeoutS1;

  subscriptions: Subscription[] = [];
  childEl: ElementRef;
  // @ViewChild('coveredComponent', { read: ElementRef }) public childEl: ElementRef;
  @ViewChild('coveredComponent', {read: ElementRef}) private set coveredComponent(element: ElementRef) {
    if (element !== undefined) {
      this.childEl = element;

      this.subscriptions.push(this.componentsSS.eventsStatusSteam$.subscribe(state => state
        ? element.nativeElement.style.pointerEvents = 'auto'
        : element.nativeElement.style.pointerEvents = 'none'
      ));
      this.compStyleProcessingS();
    }
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

  constructor(
    public viewControlService: ViewControlService,
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

  styleProcessing() {
    this.compStyleProcessingM();
    this.compStyleProcessingS();
  }

  compStyleProcessingM() {
    if (this.selfComponent.style === undefined) {
      this.applyStyle(this.el, this.blueprint);
      this.selfComponent.style = this.el.nativeElement.style.cssText;
    } else {
      this.el.nativeElement.style.cssText = this.selfComponent.style;
    }
  }

  compStyleProcessingS() {
    if (this.selfComponent.childStyle === undefined ) {
      this.applyStyle(this.childEl, this.secondaryBlueprint);
      this.selfComponent.childStyle = this.childEl.nativeElement.style.cssText;
    } else {
      this.childEl.nativeElement.style.cssText = this.selfComponent.childStyle;
    }
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

// Extended component class
@Component({
  selector: 'extended-component',
  template: `
    <div></div>
  `
})
export class ExtendedComponent extends PreviewComponent implements AfterViewInit {

  @Input() set component(component: ExtendedModelClass) {
    this.selfComponent = component;
    // if (typeof component.order !== 'undefined') {
    //   this.rerender();
    // }
  }

  @Input() set addComponent(newComponent: ModelInterface) {
    console.log(newComponent);
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

  ngAfterViewInit() {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessing();
    this.rerender().then();
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

