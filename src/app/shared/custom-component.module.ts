import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CCLinearLayoutComponent} from '../object-models/components/view-components/cc.linear-layout.component';
import {DraggableDirective} from './directives/draggable.directive';
import {DraggableHelperDirective} from './directives/draggable-helper.directive';
import {CDSortableDirective} from './directives/cd.sortable.directive';
import {CCButtonComponent} from '../object-models/components/view-components/cc.button.component';
import {CCPVLinearLayoutComponent} from '../object-models/components/pre-view-components/cc.pv-linear-layout.component';
import {MaterialModule} from './material.module';
import {CCPVButtonComponent} from '../object-models/components/pre-view-components/cc.pv-button.component';

import {CCAutocompleteComponent} from '../object-models/components/view-components/cc.autocomplete.component';
import {CCPVAutocompleteComponent} from '../object-models/components/pre-view-components/cc.pv.autocomplete.component';
import {CCCheckboxComponent} from '../object-models/components/view-components/cc.checkbox.component';
import {CCPVCheckboxComponent} from '../object-models/components/pre-view-components/cc.pv.checkbox.component';
import {CCFormFieldComponent} from '../object-models/components/view-components/cc.form-field.component';
import {CCPVFormFieldComponent} from '../object-models/components/pre-view-components/cc.pv.form-field.component';

import {CCInputComponent} from '../object-models/components/view-components/cc.input.component';
import {CCPVInputComponent} from '../object-models/components/pre-view-components/cc.pv.input.component';
import {CCRadioButtonComponent} from '../object-models/components/view-components/cc.radio-button.component';
import {CCPVRadioButtonComponent} from '../object-models/components/pre-view-components/cc.pv.radio-button.component';
import {FlexibleInputComponent} from '../component-manager/flexible-input/flexible-input.component';
import {CCSlideToggleComponent} from '../object-models/components/view-components/cc.slide-toggle.component';
import {CCPVSlideToggleComponent} from '../object-models/components/pre-view-components/cc.pv.slide-toggle.component';
import {DialogExchangerComponent} from '../dialog-exchanger/dialog-exchanger.component';
import {CapacityComponent} from '../capacity/capacity.component';
import {CCAbsoluteLayoutComponent} from '../object-models/components/view-components/cc.absolute-layout.component';
import {CCPVAbsoluteLayoutComponent} from '../object-models/components/pre-view-components/cc.pv.absolute-layout.component';
import {SimpleComponent} from '../object-models/components/class models/simple.component';
import {ExtendedComponent} from '../object-models/components/class models/extended.component';

@NgModule({
  declarations: [
    SimpleComponent,
    ExtendedComponent,
    FlexibleInputComponent,
    DialogExchangerComponent,
    CapacityComponent,

    CCLinearLayoutComponent,
    CCButtonComponent,
    CCAutocompleteComponent,
    CCCheckboxComponent,
    CCFormFieldComponent,
    CCInputComponent,
    CCRadioButtonComponent,
    CCSlideToggleComponent,
    CCAbsoluteLayoutComponent,

    CCPVLinearLayoutComponent,
    CCPVButtonComponent,
    CCPVAutocompleteComponent,
    CCPVCheckboxComponent,
    CCPVFormFieldComponent,
    CCPVInputComponent,
    CCPVRadioButtonComponent,
    CCPVSlideToggleComponent,
    CCPVAbsoluteLayoutComponent,

    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective,
    FlexibleInputComponent,
    CapacityComponent,
  ],
})
export class CustomComponentModule {}
