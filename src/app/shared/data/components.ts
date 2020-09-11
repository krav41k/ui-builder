import {ComponentItem} from '../interfaces/component-item';

import {
  CCAbsoluteLayoutComponent,
  CCAutocompleteComponent, CCButtonComponent,
  CCCheckboxComponent,
  CCFormFieldComponent,
  CCInputComponent, CCLinearLayoutComponent, CCPVAbsoluteLayoutComponent,
  CCPVAutocompleteComponent, CCPVButtonComponent,
  CCPVCheckboxComponent,
  CCPVFormFieldComponent,
  CCPVInputComponent, CCPVLinearLayoutComponent,
  CCPVRadioButtonComponent,
  CCPVSlideToggleComponent,
  CCRadioButtonComponent, CCSlideToggleComponent
} from '../../object-models/components';


export const componentsUnderCategories = new Map<string, ComponentItem[]>([
  ['Form Controls', [
    {title: 'Autocomplete', viewComponent: CCAutocompleteComponent, preViewComponent: CCPVAutocompleteComponent, type: 'simple'},
    {title: 'Checkbox', viewComponent: CCCheckboxComponent, preViewComponent: CCPVCheckboxComponent, type: 'simple'},
    // {title: 'Datepicker', viewComponent: MatDatepicker, preViewComponent: undefined, type: 'simple'},
    {title: 'Form field', viewComponent: CCFormFieldComponent, preViewComponent: CCPVFormFieldComponent, type: 'simple'},
    {title: 'Input', viewComponent: CCInputComponent, preViewComponent: CCPVInputComponent, type: 'simple'},
    {title: 'Radio button', viewComponent: CCRadioButtonComponent, preViewComponent: CCPVRadioButtonComponent, type: 'simple'},
    // {title: 'Select', viewComponent: 'MatSelect', preViewComponent: undefined, type: 'simple'},
    // {title: 'Slider', viewComponent: 'MatSlider', preViewComponent: undefined, type: 'simple'},
    {title: 'Slide toggle', viewComponent: CCSlideToggleComponent, preViewComponent: CCPVSlideToggleComponent, type: 'simple'},
  ]],
  ['Navigation', [
    // {title: 'Menu', viewComponent: 'MatMenu', preViewComponent: undefined, type: 'simple'},
    // {title: 'Sidenav', viewComponent: 'MatSidenav', preViewComponent: undefined, type: 'simple'},
    // {title: 'Toolbar', viewComponent: 'MatToolbar', preViewComponent: undefined, type: 'simple'}
  ]],
  ['Layout', [
    {title: 'Linear layout', viewComponent: CCLinearLayoutComponent, preViewComponent: CCPVLinearLayoutComponent, type: 'extended'},
    {title: 'Absolute layout', viewComponent: CCAbsoluteLayoutComponent, preViewComponent: CCPVAbsoluteLayoutComponent, type: 'extended'},
    // {title: 'Card', viewComponent: 'MatCard', preViewComponent: undefined, type: 'extended'},
    // {title: 'Divider', viewComponent: 'MatDivider', preViewComponent: undefined, type: 'extended'},
    // {title: 'Expansion Panel', viewComponent: 'MatExpansion', preViewComponent: undefined, type: 'extended'},
    // {title: 'Grid list', viewComponent: 'MatGridList', preViewComponent: undefined, type: 'extended'},
    // {title: 'List', viewComponent: 'MatList', preViewComponent: undefined, type: 'extended'},
    // {title: 'Stepper', viewComponent: 'MatStepper', preViewComponent: undefined, type: 'extended'},
    // {title: 'Tabs', viewComponent: 'MatTabs', preViewComponent: undefined, type: 'extended'},
    // {title: 'Tree', viewComponent: 'MatTree', preViewComponent: undefined, type: 'extended'}
  ]],
  ['Buttons & Indicators', [
    {title: 'Button', viewComponent: CCButtonComponent, preViewComponent: CCPVButtonComponent, type: 'simple'},
    // {title: 'Button toggle', viewComponent: 'MatButtonToggle', preViewComponent: undefined, type: 'simple'},
    // {title: 'Badge', tag: 'MatBadge', preViewComponent: undefined, type: 'simple'},
    // {title: 'Chips', viewComponent: 'MatChips', preViewComponent: undefined, type: 'simple'},
    // {title: 'Icon', viewComponent: 'MatIcon', preViewComponent: undefined, type: 'simple'},
    // {title: 'Progress spinner', viewComponent: 'MatProgressSpinner', preViewComponent: undefined, type: 'simple'},
    // {title: 'Progress bar', viewComponent: 'MatProgressBar', preViewComponent: undefined, type: 'simple'},
    // {title: 'Ripples', tag: 'MatRipple', preViewComponent: '', type: 'simple'}
  ]],
  // ['Popups & Modals', [
  //   {title: 'Bottom Sheet', tag: 'MatBottomSheet'},
  //   {title: 'Dialog', tag: 'MatDialog', type: 'extended'},
  //   {title: 'Snackbar', tag: 'MatSnackBar'},
  //   {title: 'Tooltip', tag: 'MatTooltip'}
  // ]],
  // ['Data table', [
  //   {title: 'Paginator', viewComponent: 'MatPaginator', preViewComponent: undefined, type: 'simple'},
  //   {title: 'Sort header', viewComponent: 'MatSort', preViewComponent: undefined, type: 'simple'},
  //   {title: 'Table', viewComponent: 'MatTable', preViewComponent: undefined, type: 'extended'}
  // ]]
]);

export const components = new Map<string, any>([
  ['Autocomplete', {class: CCAutocompleteComponent,  type: 'simple'}],
  ['Checkbox', {class: CCCheckboxComponent,  type: 'simple'}],
  // ['Datepicker', {class: MatDatepicker,  type: 'simple'}],
  ['Form field', {class: CCFormFieldComponent, type: 'simple'}],
  ['Input', {class: CCInputComponent, type: 'simple'}],
  ['Radio button', {class: CCRadioButtonComponent, type: 'simple'}],
  ['Select', {class: 'MatSelect', type: 'simple'}],
  ['Slider', {class: 'MatSlider', type: 'simple'}],
  ['Slide toggle', {class: CCSlideToggleComponent, type: 'simple'}],
  ['Sidenav', {class: 'MatSidenav', type: 'simple'}],
  ['Toolbar', {class: 'MatToolbar', type: 'simple'}],
  ['Menu', {class: 'MatMenu', type: 'simple'}],
  ['Linear layout', {class: CCLinearLayoutComponent, type: 'extended'}],
  ['Absolute layout', {class: CCAbsoluteLayoutComponent, type: 'extended'}],
  ['Card', {class: 'MatCard', type: 'extended'}],
  ['Divider', {class: 'MatDivider', type: 'extended'}],
  ['Expansion Panel', {class: 'MatExpansion', type: 'extended'}],
  ['Grid list', {class: 'MatGridList', type: 'extended'}],
  ['List', {class: 'MatList', type: 'extended'}],
  ['Stepper', {class: 'MatStepper', type: 'extended'}],
  ['Tabs', {class: 'MatTabs', type: 'extended'}],
  ['Tree', {class: 'MatTree', type: 'extended'}],
  ['Button', {class: CCButtonComponent, type: 'simple'}],
  ['Button toggle', {class: 'MatButtonToggle', type: 'simple'}],
  ['Chips', {class: 'MatChips', type: 'simple'}],
  ['Icon', {class: 'MatIcon', type: 'simple'}],
  ['Progress spinner', {class: 'MatProgressSpinner', type: 'simple'}],
  ['Progress bar', {class: 'MatProgressBar', type: 'simple'}],
  ['Paginator', {class: 'MatPaginator', type: 'simple'}],
  ['Sort header', {class: 'MatSort', type: 'simple'}],
  ['Table', {class: 'MatTable', type: 'extended'}],
]);
