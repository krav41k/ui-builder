export interface ModelInterface {
  parent;
  id: string;
  type: string;

  width?: string;
  height?: string;
  backgroundColor?: string;
  border?: string;
  color?: string;
  padding?: string;
  margin?: string;
  textAlign?: string;
  textDecoration?: string;
  fontSize?: string;
}

export class SimpleModelClass implements ModelInterface {
  constructor(public parent: ModelInterface, public id: string, public type: string) {
  }
}

export class ExtendedModelClass implements ModelInterface {
  subObjectsList = [];
  constructor(public parent: ModelInterface, public id: string, public type: string) {
  }

  addObject(obj: ModelInterface) {
    this.subObjectsList.push(obj);
    obj.parent = this;
  }
}

export class Button extends SimpleModelClass {
  type = 'button';
  color = 'white';
  textAlign = 'center';
  fontSize: '10px';
}


