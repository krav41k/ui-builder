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
      // console.log(`wedding success: cell - ${this.newComponentCell}, data - ${this.newComponentData}`);
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

  onWedding(data: number | any) {
    typeof data === 'number' ? this.newComponentCell = data : this.newComponentData = data;

    // console.log(`wedding success, ${data}`);
  }
}
