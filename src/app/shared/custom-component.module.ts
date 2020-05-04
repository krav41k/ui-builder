import {NgModule} from '@angular/core';
import {CCLinearLayoutComponent} from '../object-models/components/cc.linear-layout.component';
import {DraggableDirective} from './directives/draggable.directive';
import {DraggableHelperDirective} from './directives/draggable-helper.directive';
import {CDSortableDirective} from './directives/cd.sortable.directive';
import {CCButtonComponent} from '../object-models/components/cc.button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    CCLinearLayoutComponent,
    CCButtonComponent,

    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective,
  ],
    imports: [
        MatButtonModule,
        MatCheckboxModule
    ],
  exports: [
    CCLinearLayoutComponent,
    DraggableDirective,
    DraggableHelperDirective,
    CDSortableDirective
  ]
})
export class CustomComponentModule {}
