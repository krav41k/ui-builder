import {Injectable} from '@angular/core';
import {ExtendedModelClass, ModelClass, ModelInterface, SimpleModelClass} from '../../object-models/model.classes';
import {CCLinearLayoutComponent} from '../../object-models/components/view-components/cc.linear-layout.component';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ComponentsStorageService {

  public root = new ExtendedModelClass(null, CCLinearLayoutComponent, 0, 'LinearLayout', 0);
  public componentsList: Map<number, ModelClass>
    = new Map<number, ModelClass>([[0, this.root]]);
  public componentsSteam$ = new BehaviorSubject(this.componentsList);
  public idCounter = 1;
  private newComponentData: { componentClass, componentType, componentName };
  public newComponentCell = null;

  onPointerUp() {
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

  bindUpdate(id: number, component: ModelClass) {
    this.componentsList.set(id, component);
  }

  onWedding(data: number | any) {
    typeof data === 'number' ? this.newComponentCell = data : this.newComponentData = data;
  }
}
