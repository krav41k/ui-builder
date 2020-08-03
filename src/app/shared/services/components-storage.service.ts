import {Injectable} from '@angular/core';
import {ExtendedModelClass, ComponentClass, SimpleModelClass, SimpleComponent, ExtendedComponent} from '../../object-models/model.classes';
import {CCLinearLayoutComponent} from '../../object-models/components/view-components/cc.linear-layout.component';
import {BehaviorSubject, Subject} from 'rxjs';
import {CCAutocompleteComponent} from '../../object-models/components/view-components/cc.autocomplete.component';
import {CCPVAutocompleteComponent} from '../../object-models/components/pre-view-components/cc.pv.autocomplete.component';
import {CCCheckboxComponent} from '../../object-models/components/view-components/cc.checkbox.component';
import {CCPVCheckboxComponent} from '../../object-models/components/pre-view-components/cc.pv.checkbox.component';
import {MatDatepicker} from '@angular/material/datepicker';
import {CCFormFieldComponent} from '../../object-models/components/view-components/cc.form-field.component';
import {CCPVFormFieldComponent} from '../../object-models/components/pre-view-components/cc.pv.form-field.component';
import {CCInputComponent} from '../../object-models/components/view-components/cc.input.component';
import {CCPVInputComponent} from '../../object-models/components/pre-view-components/cc.pv.input.component';
import {CCRadioButtonComponent} from '../../object-models/components/view-components/cc.radio-button.component';
import {CCPVRadioButtonComponent} from '../../object-models/components/pre-view-components/cc.pv.radio-button.component';
import {CCSlideToggleComponent} from '../../object-models/components/view-components/cc.slide-toggle.component';
import {CCPVSlideToggleComponent} from '../../object-models/components/pre-view-components/cc.pv.slide-toggle.component';
import {CCPVLinearLayoutComponent} from '../../object-models/components/pre-view-components/cc.pv-linear-layout.component';
import {CCButtonComponent} from '../../object-models/components/view-components/cc.button.component';
import {CCPVButtonComponent} from '../../object-models/components/pre-view-components/cc.pv-button.component';

@Injectable()
export class ComponentsStorageService {

  componentLinkList = new Map<string, any>([
    ['Autocomplete', {class: CCAutocompleteComponent,  type: 'simple'}],
    ['Checkbox', {class: CCCheckboxComponent,  type: 'simple'}],
    ['Datepicker', {class: MatDatepicker,  type: 'simple'}],
    ['Form field', {class: CCFormFieldComponent, type: 'simple'}],
    ['Input', {class: CCInputComponent, type: 'simple'}],
    ['Radio button', {class: CCRadioButtonComponent, type: 'simple'}],
    ['Select', {class: 'MatSelect',type: 'simple'}],
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


  public root = new ExtendedModelClass(CCLinearLayoutComponent, 0, 'LinearLayout', 0);
  public componentsList: Map<number, ComponentClass>
    = new Map<number, ComponentClass>([[0, this.root]]);
  public componentsSteam$ = new BehaviorSubject(this.componentsList);

  private selectedComponentCoordinates = {x: 0, y: 0};
  public idCounter = 1;
  private newComponentData: { componentClass, componentType, componentName };
  public newComponentCell = null;

  public selectedComponentsSteam$: Subject<ComponentClass> = new Subject();

  public eventsStatusSteam$: BehaviorSubject<boolean> = new BehaviorSubject(false);


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
    this.componentsSteam$.next(this.componentsList);
    parentComponent?.addObject(newComponent, this.idCounter);
    this.idCounter++;
  }

  bindUpdate(id: number, component: ComponentClass) {
    this.componentsList.set(id, component);
  }

  onWedding(data: number | any) {
    typeof data === 'number' ? this.newComponentCell = data : this.newComponentData = data;
  }

  // only for extended components
  selectComponent(component: ComponentClass, event: PointerEvent) {
    if (this.selectedComponentCoordinates.x !== event.x && this.selectedComponentCoordinates.y !== event.y) {
      this.selectedComponentCoordinates = {x: event.x, y: event.y};
      this.selectedComponentsSteam$.next(component);
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
    console.log(Object.fromEntries(prepareComponentList));
    return Object.fromEntries(prepareComponentList);
  }

  public parseProjectJSON(data) {
    return false;
    console.log(JSON.parse(data));

    if (data === undefined) return false;

    JSON.parse(data).forEach(value => {

      if (value === undefined) return false;

      const componentClassInfo = this.componentLinkList.get(value.name);

      const component = componentClassInfo.type === 'simple'
        ? new SimpleModelClass(
          componentClassInfo.class,
          value.id,
          value.name,
          value.length,
          null,
          value.style,
          value.childStyle,
          value.floatComponentData,
        )
        : new ExtendedModelClass(
          componentClassInfo.class,
          value.id,
          value.name,
          value.length,
          null,
          value.style,
        );
    })
    console.log(this.componentsList);
  }
}
