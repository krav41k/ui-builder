import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {
  CCAbsoluteLayoutComponent,
  CCAutocompleteComponent,
  CCButtonComponent,
  CCCheckboxComponent,
  CCFormFieldComponent,
  CCInputComponent,
  CCLinearLayoutComponent, CCPVAbsoluteLayoutComponent,
  CCPVAutocompleteComponent,
  CCPVButtonComponent, CCPVCheckboxComponent, CCPVFormFieldComponent, CCPVInputComponent,
  CCPVLinearLayoutComponent, CCPVRadioButtonComponent, CCPVSlideToggleComponent,
  CCRadioButtonComponent,
  CCSlideToggleComponent
} from '../object-models/components';
import {DraggableDirective} from './directives/draggable.directive';
import {DraggableHelperDirective} from './directives/draggable-helper.directive';
import {CDSortableDirective} from './directives/cd.sortable.directive';
import {FlexibleInputComponent} from '../component-manager/flexible-input/flexible-input.component';
import {DialogExchangerComponent} from '../dialog-exchanger/dialog-exchanger.component';
import {CapacityComponent} from '../capacity/capacity.component';
import {PreviewComponent} from '../object-models/components/class models/preview.component';
import {SimpleComponent} from '../object-models/components/class models/simple.component';
import {ExtendedComponent} from '../object-models/components/class models/extended.component';
import {MaterialModule} from './material.module';
import {CCDragZoneComponent} from '../object-models/components/view-components/cc.drag-zone.component';
import {MovableDirective} from './directives/movable.directive';


@NgModule({
  declarations: [
    PreviewComponent,
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
    CCDragZoneComponent,

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
    MovableDirective,
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
    MovableDirective
  ],
})
export class CustomComponentModule {}
