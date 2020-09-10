import {
  AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ElementRef, HostListener,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {MatCheckbox} from '@angular/material/checkbox';

import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Axis} from '../shared/classes/axis';
import {componentsUnderCategories} from '../shared/data/components';
import {ComponentItem} from '../shared/interfaces/component-item';

@Component({
  selector: 'ub-components-layout',
  templateUrl: './components-layout.component.html',
  styleUrls: ['./components-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsLayoutComponent implements AfterViewChecked {

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

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private componentsSS: ComponentsStorageService,
    private cdr: ChangeDetectorRef,
  ) {
    this.componentList = componentsUnderCategories;
  }

  ngAfterViewChecked(): void {
    // Проверка нужна для драга когда элемент списка не был выбран, а сразу начал перетягиваться
    if (this.createPermission) {
      setTimeout(() => {
        const comp = this.componentList.get(this.selectedCategory).find(item => item.title === this.selectedComponent);
        this.onDragStart(comp.viewComponent, comp.preViewComponent);
        this.createPermission = false;
      });
    }
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
    this.cdr.detectChanges();
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
