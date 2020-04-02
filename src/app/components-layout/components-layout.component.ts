import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver, ElementRef, HostListener, OnChanges,
  OnInit, Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {MatAutocomplete} from '@angular/material/autocomplete';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {CCLinearLayoutComponent} from '../object-models/components/cc.linear-layout.component';

export interface ComponentItem {
  title: string;
  tag: any;
  type: 'simple' | 'extended';
}

export class Axis {
  x: number;
  y: number;
}

@Component({
  selector: 'app-components-layout',
  templateUrl: './components-layout.component.html',
  styleUrls: ['./components-layout.component.scss']
})
export class ComponentsLayoutComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('componentContainer', { read: ViewContainerRef }) container;
  @ViewChild('componentContainerContainer', {static: false}) containerRef: ElementRef;
  selectedCategory = 'Form Controls';
  selectedComponent = 'Checkbox';
  selectedComponentType = 'simple';
  selectedComponentTag = MatCheckbox;
  dragging = false;
  createPermission = false;
  primaryEvent;
  axis: Axis = new Axis();
  selectedOrder = 'Category';

  public componentList: Map<string, ComponentItem[]>;

  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2, private componentsSS: ComponentsStorageService) {
    this.componentList = new Map<string, ComponentItem[]>([
      ['Form Controls', [
        {title: 'Autocomplete', tag: MatAutocomplete, type: 'simple'},
        {title: 'Checkbox', tag: MatCheckbox, type: 'simple'},
        {title: 'Datepicker', tag: MatDatepicker, type: 'simple'},
        {title: 'Form field', tag: MatFormField, type: 'simple'},
        {title: 'Input', tag: MatInputModule, type: 'simple'},
        {title: 'Radio button', tag: '', type: 'simple'},
        {title: 'Select', tag: 'MatSelect', type: 'simple'},
        {title: 'Slider', tag: 'MatSlider', type: 'simple'},
        {title: 'Slide toggle', tag: 'MatSlider', type: 'simple'}
      ]],
      ['Navigation', [
        {title: 'Menu', tag: 'MatMenu', type: 'simple'},
        {title: 'Sidenav', tag: 'MatSidenav', type: 'simple'},
        {title: 'Toolbar', tag: 'MatToolbar', type: 'simple'}
      ]],
      ['Layout', [
        {title: 'Linear layout', tag: CCLinearLayoutComponent, type: 'extended'},
        {title: 'Card', tag: 'MatCard', type: 'extended'},
        {title: 'Divider', tag: 'MatDivider', type: 'extended'},
        {title: 'Expansion Panel', tag: 'MatExpansion', type: 'extended'},
        {title: 'Grid list', tag: 'MatGridList', type: 'extended'},
        {title: 'List', tag: 'MatList', type: 'extended'},
        {title: 'Stepper', tag: 'MatStepper', type: 'extended'},
        {title: 'Tabs', tag: 'MatTabs', type: 'extended'},
        {title: 'Tree', tag: 'MatTree', type: 'extended'}
      ]],
      ['Buttons & Indicators', [
        {title: 'Button', tag: 'MatButton', type: 'simple'},
        {title: 'Button toggle', tag: 'MatButtonToggle', type: 'simple'},
        // {title: 'Badge', tag: 'MatBadge', type: 'simple'},
        {title: 'Chips', tag: 'MatChips', type: 'simple'},
        {title: 'Icon', tag: 'MatIcon', type: 'simple'},
        {title: 'Progress spinner', tag: 'MatProgressSpinner', type: 'simple'},
        {title: 'Progress bar', tag: 'MatProgressBar', type: 'simple'},
        // {title: 'Ripples', tag: 'MatRipple', type: 'simple'}
      ]],
      // ['Popups & Modals', [
      //   {title: 'Bottom Sheet', tag: 'MatBottomSheet'},
      //   {title: 'Dialog', tag: 'MatDialog', type: 'extended'},
      //   {title: 'Snackbar', tag: 'MatSnackBar'},
      //   {title: 'Tooltip', tag: 'MatTooltip'}
      // ]],
      ['Data table', [
        {title: 'Paginator', tag: 'MatPaginator', type: 'simple'},
        {title: 'Sort header', tag: 'MatSort', type: 'simple'},
        {title: 'Table', tag: 'MatTable', type: 'extended'}
      ]]
    ]);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}

  ngAfterViewChecked(): void {
    if (this.createPermission) {
      setTimeout(() => {
        this.onDragStart(this.componentList.get(this.selectedCategory).find(item => item.title === this.selectedComponent).tag);
        this.createPermission = false;
      });
    }

    // убрать проверку из ngAfterViewChecked
  }

  onSelected(title: string, componentType?: string) {
    if (componentType) {
      this.selectedComponent = title;
      this.selectedOrder = 'Component';
    } else {
      if (this.selectedCategory !== title) {
        this.selectedCategory = title;
        const selectedComponent = this.componentList.get(title)[0];
        this.selectedComponent = selectedComponent.title;
        this.selectedComponentType = selectedComponent.type;
      }
      this.selectedOrder = 'Category';
    }
  }

  onDragStart(tag) {
    this.selectedComponentTag = tag;
    // const element = this.renderer.createElement();
    // const text = this.renderer.createText('test');
    // this.renderer.addClass(element, 'mat-checkbox');
    // this.renderer.addClass(element, 'mat-accent');
    // this.renderer.appendChild(this.container.nativeElement, element);
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(tag);
    this.container.createComponent(factory);
    this.axis.x = this.containerRef.nativeElement.getBoundingClientRect().x;
    this.axis.y = this.containerRef.nativeElement.getBoundingClientRect().y;
    const x  = this.primaryEvent.clientX - this.axis.x;
    const y = this.primaryEvent.clientY - this.axis.y;
    this.containerRef.nativeElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
  }

  @HostListener('document:pointermove', ['$event']) onDragMove(event: PointerEvent) {
    if (this.dragging) {
      const x = event.clientX - this.axis.x;
      const y = event.clientY - this.axis.y;
      this.containerRef.nativeElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
  }

  @HostListener('document:pointerup') onDragEnd() {
    if (this.dragging) {
      this.dragging = false;
      this.container.remove();
      this.containerRef.nativeElement.style.transform = '';
      this.componentsSS.onWedding({
        componentClass: this.selectedComponentTag,
        componentType: this.selectedComponentType
      });
      console.log('got drag end');
    }
  }
}
