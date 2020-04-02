import {HostListener, Injectable, Input} from '@angular/core';
import {ExtendedModelClass, ModelInterface, SimpleModelClass} from '../../object-models/model.classes';
import {CCLinearLayoutComponent} from '../../object-models/components/cc.linear-layout.component';

@Injectable()
export class ComponentsStorageService {
  root: ModelInterface = new ExtendedModelClass(null, CCLinearLayoutComponent, 0);
  componentsList: Map<number, ModelInterface> = new Map<number, ModelInterface>([[0, this.root]]);
  idCounter = 1;
  private newComponentData: { componentClass, componentType };
  public newComponentCell = null;

  @HostListener('document:pointerup') onPointerUp() {
    setTimeout(() => {
      console.log(`wedding success: cell - ${this.newComponentCell}, data - ${this.newComponentData}`);
      if (this.newComponentData !== null && this.newComponentCell !== null) {
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
      ? newComponent = new SimpleModelClass(parentComponent, data.componentClass, this.idCounter)
      : newComponent = new ExtendedModelClass(parentComponent, data.componentClass, this.idCounter);
    this.componentsList.set(this.idCounter, newComponent);
    parentComponent.addObject(newComponent, this.idCounter);
    this.idCounter++;
  }

  bindUpdate(id: number, component: ModelInterface) {
    this.componentsList.set(id, component);
  }

  onWedding(data: number | any) {
    typeof data === 'number' ? this.newComponentCell = data : this.newComponentData = data;

    console.log(`wedding success, ${data}`);
  }
}
