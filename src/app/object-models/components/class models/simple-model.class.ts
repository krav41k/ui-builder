import {ModelInterface} from './model.interface';
import {ExtendedModelClass} from './extended-model.class';
import {materialDirectiveProperties} from '../../../shared/data/material-properties';


export class SimpleModelClass implements ModelInterface {

  public componentRef;
  angularMaterialData = materialDirectiveProperties;

  componentPropertiesList;
  layoutPropertiesList;

  constructor(
    public type,
    public id: number,
    public name,
    public level,

    public parent?: ExtendedModelClass,
    public style?,
    public childStyle?,
    public flexComponentData?
  ) {}
}
