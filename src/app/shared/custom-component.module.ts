import {NgModule} from '@angular/core';
import {CCLinearLayoutComponent} from '../object-models/components/view-components/cc.linear-layout.component';
import {DraggableDirective} from './directives/draggable.directive';
import {DraggableHelperDirective} from './directives/draggable-helper.directive';
import {CDSortableDirective} from './directives/cd.sortable.directive';
import {CCButtonComponent} from '../object-models/components/view-components/cc.button.component';
import {CDViewDraggableDirective} from './directives/cd.view-draggable.directive';
import {CCPVLinearLayoutComponent} from '../object-models/components/pre-view-components/cc.pv-linear-layout.component';
import {MaterialModule} from './material.module';
import {CCPVButtonComponent} from '../object-models/components/pre-view-components/cc.pv-button.component';

@NgModule({
  declarations: [
    CCLinearLayoutComponent,
    CCButtonComponent,

    CCPVLinearLayoutComponent,
    CCPVButtonComponent,

    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective,
    CDViewDraggableDirective,

  ],
  imports: [
    MaterialModule
  ],
  exports: [
    CCLinearLayoutComponent,
    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective,
    CDViewDraggableDirective,
  ]
})
export class CustomComponentModule {}
