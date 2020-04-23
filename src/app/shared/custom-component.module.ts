import {NgModule} from '@angular/core';
import {CCLinearLayoutComponent} from '../object-models/components/cc.linear-layout.component';
import {SortableListDirective} from './directives/sortable-list.directive';
import {SortableDirective} from './directives/sortable.directive';
import {DraggableDirective} from './directives/draggable.directive';
import {DraggableHelperDirective} from './directives/draggable-helper.directive';
import {CDSortableDirective} from './directives/cd.sortable.directive';

@NgModule({
  declarations: [
    CCLinearLayoutComponent,
    SortableListDirective,
    SortableDirective,
    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective,
  ],
  exports: [
    CCLinearLayoutComponent,
    SortableListDirective,
    SortableDirective,
    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective
  ]
})
export class CustomComponentModule {}
