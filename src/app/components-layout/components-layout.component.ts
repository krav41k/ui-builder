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
import {CCLinearLayoutComponent} from '../object-models/components/view-components/cc.linear-layout.component';
import {Axis} from '../shared/classes/Axis';
import {CCButtonComponent} from '../object-models/components/view-components/cc.button.component';
import {CCPVLinearLayoutComponent} from '../object-models/components/pre-view-components/cc.pv-linear-layout.component';
import {CCPVButtonComponent} from '../object-models/components/pre-view-components/cc.pv-button.component';

export interface ComponentItem {
  title: string;
  viewComponent: any;
  preViewComponent: any;
  type: 'simple' | 'extended';
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
  selectedComponentView = MatCheckbox;
  dragging = false;
  createPermission = false;
  primaryEvent;
  axis: Axis = new Axis();
  selectedOrder = 'Category';

  public componentList: Map<string, ComponentItem[]>;

  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2, private componentsSS: ComponentsStorageService) {
    // некоторые пункты списка закоментированы, потому что они подключаются через propertyInterface(еще не реализовано)
    this.componentList = new Map<string, ComponentItem[]>([
      ['Form Controls', [
        {title: 'Autocomplete', viewComponent: MatAutocomplete, preViewComponent: undefined, type: 'simple'},
        {title: 'Checkbox', viewComponent: MatCheckbox, preViewComponent: undefined, type: 'simple'},
        {title: 'Datepicker', viewComponent: MatDatepicker, preViewComponent: undefined, type: 'simple'},
        {title: 'Form field', viewComponent: MatFormField, preViewComponent: undefined, type: 'simple'},
        {title: 'Input', viewComponent: MatInputModule, preViewComponent: undefined, type: 'simple'},
        {title: 'Radio button', viewComponent: '', preViewComponent: undefined, type: 'simple'},
        {title: 'Select', viewComponent: 'MatSelect', preViewComponent: undefined, type: 'simple'},
        {title: 'Slider', viewComponent: 'MatSlider', preViewComponent: undefined, type: 'simple'},
        {title: 'Slide toggle', viewComponent: 'MatSlider', preViewComponent: undefined, type: 'simple'},
        {title: 'Slide toggle', viewComponent: 'MatSlider', preViewComponent: undefined, type: 'simple'},
        {title: 'Slide toggle', viewComponent: 'MatSlider', preViewComponent: undefined, type: 'simple'},
        {title: 'Slide', viewComponent: 'MatSlider', preViewComponent: undefined, type: 'simple'},
      ]],
      ['Navigation', [
        {title: 'Menu', viewComponent: 'MatMenu', preViewComponent: undefined, type: 'simple'},
        {title: 'Sidenav', viewComponent: 'MatSidenav', preViewComponent: undefined, type: 'simple'},
        {title: 'Toolbar', viewComponent: 'MatToolbar', preViewComponent: undefined, type: 'simple'}
      ]],
      ['Layout', [
        {title: 'Linear layout', viewComponent: CCLinearLayoutComponent, preViewComponent: CCPVLinearLayoutComponent, type: 'extended'},
        {title: 'Card', viewComponent: 'MatCard', preViewComponent: undefined, type: 'extended'},
        {title: 'Divider', viewComponent: 'MatDivider', preViewComponent: undefined, type: 'extended'},
        {title: 'Expansion Panel', viewComponent: 'MatExpansion', preViewComponent: undefined, type: 'extended'},
        {title: 'Grid list', viewComponent: 'MatGridList', preViewComponent: undefined, type: 'extended'},
        {title: 'List', viewComponent: 'MatList', preViewComponent: undefined, type: 'extended'},
        {title: 'Stepper', viewComponent: 'MatStepper', preViewComponent: undefined, type: 'extended'},
        {title: 'Tabs', viewComponent: 'MatTabs', preViewComponent: undefined, type: 'extended'},
        {title: 'Tree', viewComponent: 'MatTree', preViewComponent: undefined, type: 'extended'}
      ]],
      ['Buttons & Indicators', [
        {title: 'Button', viewComponent: CCButtonComponent, preViewComponent: CCPVButtonComponent, type: 'simple'},
        {title: 'Button toggle', viewComponent: 'MatButtonToggle', preViewComponent: undefined, type: 'simple'},
        // {title: 'Badge', tag: 'MatBadge', preViewComponent: undefined, type: 'simple'},
        {title: 'Chips', viewComponent: 'MatChips', preViewComponent: undefined, type: 'simple'},
        {title: 'Icon', viewComponent: 'MatIcon', preViewComponent: undefined, type: 'simple'},
        {title: 'Progress spinner', viewComponent: 'MatProgressSpinner', preViewComponent: undefined, type: 'simple'},
        {title: 'Progress bar', viewComponent: 'MatProgressBar', preViewComponent: undefined, type: 'simple'},
        // {title: 'Ripples', tag: 'MatRipple', preViewComponent: '', type: 'simple'}
      ]],
      // ['Popups & Modals', [
      //   {title: 'Bottom Sheet', tag: 'MatBottomSheet'},
      //   {title: 'Dialog', tag: 'MatDialog', type: 'extended'},
      //   {title: 'Snackbar', tag: 'MatSnackBar'},
      //   {title: 'Tooltip', tag: 'MatTooltip'}
      // ]],
      ['Data table', [
        {title: 'Paginator', viewComponent: 'MatPaginator', preViewComponent: undefined, type: 'simple'},
        {title: 'Sort header', viewComponent: 'MatSort', preViewComponent: undefined, type: 'simple'},
        {title: 'Table', viewComponent: 'MatTable', preViewComponent: undefined, type: 'extended'}
      ]]
    ]);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}

  ngAfterViewChecked(): void {
    // Проверка нужна для драга когда элемент списка не был выбран, а сразу начал перетягиваться
    if (this.createPermission) {
      setTimeout(() => {
        const comp = this.componentList.get(this.selectedCategory).find(item => item.title === this.selectedComponent);
        this.onDragStart(comp.viewComponent, comp.preViewComponent);
        this.createPermission = false;
      });
    }

    // *убрать проверку из ngAfterViewChecked
  }

  // менеджит выбор элементов в списке
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

  // создает выбраный компонент под курсором
  onDragStart(viewComponent, previewComponent) {
    this.selectedComponentView = viewComponent;
    this.container.clear();
    if (previewComponent) {
      const factory = this.resolver.resolveComponentFactory(previewComponent);
      this.container.createComponent(factory);
      this.axis.x = this.containerRef.nativeElement.getBoundingClientRect().x;
      this.axis.y = this.containerRef.nativeElement.getBoundingClientRect().y;
      const x  = this.primaryEvent.clientX - this.axis.x;
      const y = this.primaryEvent.clientY - this.axis.y;
      this.containerRef.nativeElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
  }

  // при перемещении курсора передвигает компонент за ним
  @HostListener('document:pointermove', ['$event']) onDragMove(event: PointerEvent) {
    if (this.dragging) {
      const x = event.clientX - this.axis.x;
      const y = event.clientY - this.axis.y;
      this.containerRef.nativeElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
  }

  // удаляет компонент и сообщает об этом сторедж сервису
  @HostListener('document:pointerup') onDragEnd() {
    if (this.dragging) {
      this.dragging = false;
      this.container.remove();
      this.containerRef.nativeElement.style.transform = '';
      this.componentsSS.onWedding({
        componentClass: this.selectedComponentView,
        componentType: this.selectedComponentType,
        componentName: this.selectedComponent
      });
    }
  }
}
