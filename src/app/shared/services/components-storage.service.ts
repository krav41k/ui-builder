import {HostListener, Injectable, Input} from '@angular/core';
import {ExtendedModelClass, ModelInterface, SimpleModelClass} from '../../object-models/model.classes';
import {CCLinearLayoutComponent} from '../../object-models/components/cc.linear-layout.component';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ComponentsStorageService {
  root = new ExtendedModelClass(null, CCLinearLayoutComponent, 0, 'LinearLayout', 0);
  componentsList: Map<number, ModelInterface> = new Map<number, ModelInterface>([[0, this.root]]);
  componentsSteam$ = new BehaviorSubject(this.componentsList);
  idCounter = 1;
  private newComponentData: { componentClass, componentType, componentName };
  public newComponentCell = null;

  @HostListener('document:pointerup') onPointerUp() {
    setTimeout(() => {
      if (this.newComponentData && this.newComponentCell !== null) {
        this.addComponent(this.newComponentCell, this.newComponentData);
      }
      this.newComponentData = null;
      this.newComponentCell = null;
    });
  }

  addComponent(id, data) {
    const parentComponent = this.componentsList.get(id) as ExtendedModelClass;
    let newComponent;
    data.componentType === 'simple'
      ? newComponent = new SimpleModelClass(
        parentComponent,
        data.componentClass,
        this.idCounter,
        data.componentName,
        parentComponent.level + 1
      )
      : newComponent = new ExtendedModelClass(
        parentComponent,
        data.componentClass,
        this.idCounter,
        data.componentName,
        parentComponent.level + 1
      );
    this.componentsList.set(this.idCounter, newComponent);
    this.componentsSteam$.next(this.componentsList);
    parentComponent.addObject(newComponent, this.idCounter);
    this.idCounter++;
  }

  bindUpdate(id: number, component: ModelInterface) {
    this.componentsList.set(id, component);
  }

  swapComponents(firstComponent, secondComponent) {
    let updater = false;
    switch (true) {
      case (firstComponent.parent === secondComponent):
        console.log('case 1');
        const parentOrderIndex = secondComponent.parent.order.indexOf(secondComponent.id);

        secondComponent.order.splice(secondComponent.order.indexOf(firstComponent.id), 1);
        secondComponent.subObjectsList.delete(firstComponent.id);

        firstComponent.parent = secondComponent.parent;

        firstComponent.level = firstComponent.parent.level + 1;
        firstComponent.parent.subObjectsList.set(firstComponent.id, firstComponent);
        firstComponent.parent.order.splice(parentOrderIndex, 0, firstComponent.id);
        updater = true;
        break;

      case (secondComponent.nestedSwitch !== undefined
        && secondComponent.nestedSwitch
        && secondComponent.parent !== firstComponent):
        console.log('case 2');
        firstComponent.parent.order.splice(firstComponent.parent.order.indexOf(firstComponent.id), 1);
        firstComponent.parent.subObjectsList.delete(firstComponent.id);

        firstComponent.parent.componentRef.instance.rerender().then();
        firstComponent.parent = secondComponent;

        firstComponent.level = secondComponent.level + 1;
        secondComponent.subObjectsList.set(firstComponent.id, firstComponent);
        secondComponent.order.splice(0, 0, firstComponent.id);
        updater = true;
        break;

      case (firstComponent.parent.id === secondComponent.parent.id):
        console.log('case 3');
        const firstOrderIndex = firstComponent.parent.order.indexOf(firstComponent.id);
        const secondOrderIndex = secondComponent.parent.order.indexOf(secondComponent.id);
        firstComponent.parent.order[secondOrderIndex] = firstComponent.id;
        firstComponent.parent.order[firstOrderIndex] = secondComponent.id;
        updater = true;
        break;

      case (secondComponent.nestedSwitch === undefined
        && firstComponent.level !== secondComponent.level
        && secondComponent.parent !== firstComponent):
        console.log('case 4');
        firstComponent.parent.order.splice(firstComponent.parent.order.indexOf(firstComponent.id), 1);
        firstComponent.parent.subObjectsList.delete(firstComponent.id);

        firstComponent.parent = secondComponent.parent;

        firstComponent.level = secondComponent.level;
        firstComponent.parent.subObjectsList.set(firstComponent.id, firstComponent);
        firstComponent.parent.order.splice(firstComponent.parent.order.indexOf(secondComponent.id) + 1, 0, firstComponent.id);
        updater = true;
        break;
    }
    if (updater) {
      firstComponent.parent.componentRef.instance.rerender().then();
    }
  }

  onWedding(data: number | any) {
    typeof data === 'number' ? this.newComponentCell = data : this.newComponentData = data;
  }
}
