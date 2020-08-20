import {ComponentFactoryResolver, ElementRef, Injectable, ViewContainerRef} from '@angular/core';
import {ExtendedModelClass, ComponentClass, SimpleModelClass, ModelInterface} from '../../object-models/model.classes';
import {CCLinearLayoutComponent} from '../../object-models/components/view-components/cc.linear-layout.component';
import {BehaviorSubject, Subject} from 'rxjs';
import {CCAutocompleteComponent} from '../../object-models/components/view-components/cc.autocomplete.component';
import {CCCheckboxComponent} from '../../object-models/components/view-components/cc.checkbox.component';
import {MatDatepicker} from '@angular/material/datepicker';
import {CCFormFieldComponent} from '../../object-models/components/view-components/cc.form-field.component';
import {CCInputComponent} from '../../object-models/components/view-components/cc.input.component';
import {CCRadioButtonComponent} from '../../object-models/components/view-components/cc.radio-button.component';
import {CCSlideToggleComponent} from '../../object-models/components/view-components/cc.slide-toggle.component';
import {CCButtonComponent} from '../../object-models/components/view-components/cc.button.component';

@Injectable()
export class ComponentsStorageService {

  componentLinkList = new Map<string, any>([
    ['Autocomplete', {class: CCAutocompleteComponent,  type: 'simple'}],
    ['Checkbox', {class: CCCheckboxComponent,  type: 'simple'}],
    ['Datepicker', {class: MatDatepicker,  type: 'simple'}],
    ['Form field', {class: CCFormFieldComponent, type: 'simple'}],
    ['Input', {class: CCInputComponent, type: 'simple'}],
    ['Radio button', {class: CCRadioButtonComponent, type: 'simple'}],
    ['Select', {class: 'MatSelect', type: 'simple'}],
    ['Slider', {class: 'MatSlider', type: 'simple'}],
    ['Slide toggle', {class: CCSlideToggleComponent, type: 'simple'}],
    ['Sidenav', {class: 'MatSidenav', type: 'simple'}],
    ['Toolbar', {class: 'MatToolbar', type: 'simple'}],
    ['Menu', {class: 'MatMenu', type: 'simple'}],
    ['Linear layout', {class: CCLinearLayoutComponent, type: 'extended'}],
    ['Card', {class: 'MatCard', type: 'extended'}],
    ['Divider', {class: 'MatDivider', type: 'extended'}],
    ['Expansion Panel', {class: 'MatExpansion', type: 'extended'}],
    ['Grid list', {class: 'MatGridList', type: 'extended'}],
    ['List', {class: 'MatList', type: 'extended'}],
    ['Stepper', {class: 'MatStepper', type: 'extended'}],
    ['Tabs', {class: 'MatTabs', type: 'extended'}],
    ['Tree', {class: 'MatTree', type: 'extended'}],
    ['Button', {class: CCButtonComponent, type: 'simple'}],
    ['Button toggle', {class: 'MatButtonToggle', type: 'simple'}],
    ['Chips', {class: 'MatChips', type: 'simple'}],
    ['Icon', {class: 'MatIcon', type: 'simple'}],
    ['Progress spinner', {class: 'MatProgressSpinner', type: 'simple'}],
    ['Progress bar', {class: 'MatProgressBar', type: 'simple'}],
    ['Paginator', {class: 'MatPaginator', type: 'simple'}],
    ['Sort header', {class: 'MatSort', type: 'simple'}],
    ['Table', {class: 'MatTable', type: 'extended'}],
  ]);


  public root = new ExtendedModelClass(CCLinearLayoutComponent, 0, 'Linear layout', 0);
  public rootViewContainerRef: ViewContainerRef;
  public resolver: ComponentFactoryResolver;

  public componentsList = new Map<number, ComponentClass>([[0, this.root]]);
  public components$ = new BehaviorSubject(this.componentsList);
  public deletedComponentsList = new Map<number, Map<number, ComponentClass>>();

  public projectName = 'project';

  public selectedComponent = null;
  public idCounter = 1;
  private newComponentData: { componentClass, componentType, componentName };
  public newComponentCell = null;

  public selectedComponents$: Subject<ComponentClass> = new Subject();

  public eventsState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  initProject() {
    this.rootViewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(this.root.type);
    setTimeout(() => {
      this.root.componentRef = this.rootViewContainerRef.createComponent(factory);
      this.root.componentRef.instance.component = this.root;
    });
  }

  onPointerUp() {
    setTimeout(() => {
      if (this.newComponentData && this.newComponentCell !== null) {
        this.addComponent(this.newComponentData, this.newComponentCell);
      }
      this.newComponentData = null;
      this.newComponentCell = null;
    });
  }

  addComponent(data, id, style?) {
    const parentComponent = this.componentsList.get(id) as ExtendedModelClass;
    let newComponent;
    newComponent = data.componentType === 'simple'
      ? new SimpleModelClass(
        data.componentClass,
        this.idCounter,
        data.componentName,
        parentComponent.level + 1,
        parentComponent,
        style,
      )
      : new ExtendedModelClass(
        data.componentClass,
        this.idCounter,
        data.componentName,
        parentComponent.level + 1,
        parentComponent,
        style,
      );
    this.componentsList.set(this.idCounter, newComponent);
    this.components$.next(this.componentsList);
    parentComponent.subComponentsList.set(newComponent.id, newComponent);
    parentComponent.order.push(newComponent.id);
    parentComponent.initChildrenView(newComponent, newComponent.id);
    this.idCounter++;
  }

  deleteComponent(targetComponent: ComponentClass) {
    if (targetComponent === this.root) return false;

    const nestedDeletedCompList = new Map<number, ComponentClass>();
    const parentComponent = targetComponent.parent as ExtendedModelClass;

    parentComponent.order = parentComponent.order.filter(id => id !== targetComponent.id);
    parentComponent.subComponentsList.delete(targetComponent.id);

    const deleteComponentModel = (component) => {
      nestedDeletedCompList.set(component.id, component);
      this.componentsList.delete(component.id);

      if (component instanceof ExtendedModelClass) {
        component.subComponentsList.forEach(subComponent => {
          deleteComponentModel(subComponent);
        });
      }
    };
    deleteComponentModel(targetComponent);

    this.deletedComponentsList.set(targetComponent.id, nestedDeletedCompList);
    parentComponent.componentRef.instance.rerender();
  }

  renderComponentView(targetComponent: ExtendedModelClass) {
    targetComponent.componentRef.instance.rerender();
    targetComponent.subComponentsList.forEach(comp => {
      if (comp instanceof  ExtendedModelClass) {
        this.renderComponentView(comp);
      }
    });
  }

  bindUpdate(id: number, component: ComponentClass) {
    this.componentsList.set(id, component);
  }

  onWedding(data: number | any) {
    typeof data === 'number' ? this.newComponentCell = data : this.newComponentData = data;
  }

  selectComponent(component: ComponentClass) {
    if (this.selectedComponent !== component) {
      this.selectedComponent = component;
      this.selectedComponents$.next(component);
    }
  }

  public getProjectJSON() {
    const prepareComponentList = new Map<number, any>();
    this.componentsList.forEach((value, key) => {
      const obj: any  = {
        angularMaterialData: Object.fromEntries(value.angularMaterialData),
        id: value.id,
        level: value.level,
        name: value.name,
        style: value.style,
      };
      if (value instanceof ExtendedModelClass) {
        obj.order = value.order;
      } else {
        obj.childStyle = value.childStyle;
        obj.flexComponentData = Object.fromEntries(value.flexComponentData);
      }
      prepareComponentList.set(key, obj);
    });
    return Object.fromEntries(prepareComponentList);
  }

   public parseProjectJSON(data) {
    if (!data) return false;

    const newComponentsList = new Map<number, ComponentClass>();
    let idCounter = 0;

    (Object.values(JSON.parse(data) as ModelInterface)).forEach(value => {
      if (value === undefined) return false;

      const componentClassInfo = this.componentLinkList.get(value.name);
      if (value.id > idCounter) {
        idCounter = value.id;
      }

      let component;
      if (componentClassInfo.type === 'simple') {
        component = new SimpleModelClass(
          componentClassInfo.class,
          value.id,
          value.name,
          value.level,
          null,
          value.style,
          value.childStyle,
          value.floatComponentData,
        );
      } else {
        component = new ExtendedModelClass(
          componentClassInfo.class,
          value.id,
          value.name,
          value.level,
          null,
          value.style,
        );
        component.order = value.order;
      }
      newComponentsList.set(component.id, component);
    });

    newComponentsList.forEach(comp => {
      if (comp instanceof ExtendedModelClass) {
        comp.order.forEach(id => {
          const nestedComp = newComponentsList.get(id);
          comp.subComponentsList.set(id, nestedComp);
          nestedComp.parent = comp;
        });
      }
    });
    this.componentsList = newComponentsList;
    this.root = newComponentsList.get(0) as ExtendedModelClass;
    this.idCounter = ++idCounter;
    this.initProject();
    setTimeout(() => {
      this.root.subComponentsList.forEach(comp => {
        if (comp instanceof ExtendedModelClass) {
          this.renderComponentView(comp);
        }
      });
      this.components$.next(this.componentsList);
      console.log(this.root);
    });
  }
}
