import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter, HostBinding,
  HostListener,
  Input, OnDestroy,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

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
  public subComponentsList = new Map<number, any>();
  public order = [];
  public nestedSwitch = true;

  constructor(type, id: number, name, level, parent?: ExtendedModelClass, style?) {
    super(type, id, name, level, parent, style);
  }

  initChildrenView(obj: ComponentClass, id) {
    this.componentRef.instance.addComponent = {comp: obj, id};
  }
}

// Component Classes:
// PreviewComponentClass
export class PreviewComponent {

  el: ElementRef;
  blueprint;
  selfComponent: any;

  applyStyle(el: ElementRef, blueprint) {
    for (const item of blueprint) {
      el.nativeElement.style[item[0]] = item[1];
    }
  }
}

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
  secondaryBlueprint;

  private previousPosition: {clientX: number; clientY: number} = {clientX: 0, clientY: 0};
  private draggingS1 = false;
  private timeoutS1;

  subscriptions: Subscription[] = [];
  childEl: ElementRef;

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

  styleProcessing() {
    this.compMainStyleProcessing();
    this.compSecondaryStyleProcessing();
  }

  compMainStyleProcessing() {
    if (this.selfComponent.style === undefined) {
      this.applyStyle(this.el, this.blueprint);
      this.selfComponent.style = this.el.nativeElement.style.cssText;
    } else {
      this.el.nativeElement.style.cssText = this.selfComponent.style;
    }
  }

  compSecondaryStyleProcessing() {
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
  selector: 'ub-extended-component',
  template: `
    <div></div>
  `
})
export class ExtendedComponent extends PreviewComponent implements AfterViewInit, OnDestroy {

  @Input() set component(component: ExtendedModelClass) {
    this.selfComponent = component;
  }

  @Input() set addComponent(newComponent: ModelInterface) {
    this.render(newComponent);
  }

  selfComponent: ExtendedModelClass;
  containerEl: ElementRef;
  containerRef: ViewContainerRef;

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
    this.styleProcessing(this.containerEl);
    this.styleProcessing(this.el);
    this.rerender().then();
    this.componentsSS.addDropZoneId(this.selfComponent.id);
  }

  ngOnDestroy(): void {
    this.componentsSS.removeDropZoneId(this.selfComponent.id);
  }

  drop(event: CdkDragDrop<ExtendedModelClass>) {
    console.log(event);
    console.log(event.container.data.order);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.order, event.previousIndex, event.currentIndex);
      event.container.data.componentRef.instance.rerender();
    } else {

    }
    console.log(event.container.data.order);
  }

  styleProcessing(el: ElementRef) {
    if (this.selfComponent.style === undefined) {
      this.applyStyle(el, this.blueprint);
      this.selfComponent.style = el.nativeElement.style.cssText;
    } else {
      el.nativeElement.style.cssText = this.selfComponent.style;
    }
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

