import {ModelInterface} from './model.interface';
import {ExtendedModelClass} from './extended-model.class';
import {Subject} from 'rxjs';


export class SimpleModelClass implements ModelInterface {
  // public style;
  public componentRef;
  angularMaterialData = new Map<string, {value: any, inputType: string, availableValues?: any}>([
    ['badge', {value: 'matBadge', inputType: 'label'}],
    ['badgeMessage', {value: '', inputType: 'string'}],
    ['badgeColor', {value: '', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],
    ['badgeDisabled', {value: false, inputType: 'boolean'}],
    ['badgeOverlap', {value: false, inputType: 'boolean'}],
    ['badgePosition', {
      value: 'above',
      inputType: 'select',
      availableValues: ['above after', 'above before', 'below before', 'below after', 'before', 'after', 'above', 'below']
    }],
    ['badgeSize', {value: 'medium', inputType: 'select', availableValues: ['small', 'medium', 'large']}],

    ['ripple', {value: 'matRipple', inputType: 'label'}],
    ['rippleDisabled', {value: true, inputType: 'boolean'}],
    ['rippleAnimation', {value: true, inputType: 'boolean'}],
    ['rippleUnbounded', {value: true, inputType: 'boolean'}],
    ['rippleRadius', {value: 0, inputType: 'number'}],
    ['rippleColor', {value: '', inputType: 'select', availableValues: ['primary', 'accent', 'warn']}],

    ['snackBar', {value: 'matSnackBar', inputType: 'label'}],
    ['snackBarDisabled', {value: true, inputType: 'boolean'}],
    ['snackBarPositionH', {value: 'start', inputType: 'select', availableValues: ['start', 'center', 'end', 'left', 'right']}],
    ['snackBarPositionV', {value: 'top', inputType: 'select', availableValues: ['top', 'bottom']}],
    ['snackBarMessage', {value: 'message', inputType: 'sting'}],
    ['snackBarAction', {value: 'done', inputType: 'string'}],

    ['tooltip', {value: 'matTooltip', inputType: 'label'}],
    ['tooltipDisabled', {value: true, inputType: 'boolean'}],
    ['tooltipMessage', {value: 'message', inputType: 'string'}],
    ['tooltipPosition', {value: 'left', inputType: 'select', availableValues: ['left', 'right', 'above', 'below', 'before', 'after']}],
  ]);

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
