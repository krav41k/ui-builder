import {ComponentFactoryResolver, ElementRef, Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';

import { ExtendedModelClass } from 'src/app/object-models/components/class models/extended-model.class';
import { ComponentClass, ModelInterface } from 'src/app/object-models/components/class models/model.interface';
import { SimpleModelClass } from 'src/app/object-models/components/class models/simple-model.class';
import { components } from '../data/components';
import { CCLinearLayoutComponent } from 'src/app/object-models/components/view-components/cc.linear-layout.component';

@Injectable()
export class ComponentsStorageService {

  componentLinkList: Map<string, any> = components;

  public root = new ExtendedModelClass(CCLinearLayoutComponent, 0, 'Linear layout', 0);
  public rootViewContainerRef: ViewContainerRef;
  public resolver: ComponentFactoryResolver;

  public componentsList = new Map<number, ComponentClass>([[0, this.root]]);
  public dropZoneIdPrefix = 'cdk-drop-list-';
  public dropZonesIdArray: string[] = [this.dropZoneIdPrefix + '0'];
  public components$ = new Subject();
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
    if (data.componentType === 'simple') {
      newComponent = new SimpleModelClass(
        data.componentClass,
        this.idCounter,
        data.componentName,
        parentComponent.level + 1,
        parentComponent, style
      );
    } else {
      newComponent = new ExtendedModelClass(
        data.componentClass,
        this.idCounter,
        data.componentName,
        parentComponent.level + 1,
        parentComponent,
        style,
      );
      this.addDropZoneId(this.idCounter);
    }
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
    this.removeDropZoneId(targetComponent.id);

    const deleteComponentModel = (component) => {
      nestedDeletedCompList.set(component.id, component);
      this.componentsList.delete(component.id);

      if (component instanceof ExtendedModelClass) {
        component.subComponentsList.forEach(subComponent => {
          deleteComponentModel(subComponent);
        });
        this.removeDropZoneId(component.id);
      }
    };
    deleteComponentModel(targetComponent);

    this.deletedComponentsList.set(targetComponent.id, nestedDeletedCompList);
    parentComponent.componentRef.instance.rerender();
  }

  // initiate functions for create or recreate target component view + all nested view
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

  addDropZoneId(id: number) {
    const reducedId = this.dropZoneIdPrefix + id;
    if (this.dropZonesIdArray.findIndex(str => str === reducedId) === -1) {
      this.dropZonesIdArray.unshift(reducedId);
    }
  }

  removeDropZoneId(id: number) {
    const reducedId = this.dropZoneIdPrefix + id;
    this.dropZonesIdArray = this.dropZonesIdArray.filter(str => str !== reducedId);
  }

   public parseProjectJSON(data) {
    if (!data) return false;

    const newComponentsList = new Map<number, ComponentClass>();
    this.dropZonesIdArray = [];
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
        this.addDropZoneId(value.id);
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
    });
  }
}
