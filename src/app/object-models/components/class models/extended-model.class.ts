import {SimpleModelClass} from './simple-model.class';
import {ComponentClass} from './model.interface';

export class ExtendedModelClass extends SimpleModelClass {
  public subComponentsList = new Map<number, any>();
  public order = [];
  public nestedSwitch = true;

  constructor(type, id: number, name, level, parent?: ExtendedModelClass, style?, childStyle?, flexData?) {
    super(type, id, name, level, parent, style, childStyle, flexData);
  }

  initChildrenView(obj: ComponentClass, id) {
    this.componentRef.instance.addComponent = {comp: obj, id};
  }
}
