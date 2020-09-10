import {ComponentRef} from '@angular/core';

import {Subject} from 'rxjs';

import {SimpleModelClass} from './simple-model.class';
import {ExtendedModelClass} from './extended-model.class';


export type ComponentClass = SimpleModelClass | ExtendedModelClass;

export interface ModelInterface {
  parent?: ExtendedModelClass;
  type: any;
  name: string;
  id: number;
  level: number;
  componentRef: ComponentRef<any>;
  componentPropertiesList;
  layoutPropertiesList;
  angularMaterialData: Map<any, any>;

  flexComponentData?: Map<any, any>;
}
