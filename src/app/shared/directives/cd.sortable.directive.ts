import {Directive, ElementRef} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {TreeControlService} from '../services/tree-control.service';

@Directive({
  selector: '[cdSortable]'
})
export class CDSortableDirective extends DraggableDirective {

  constructor(public element: ElementRef, treeControlService: TreeControlService) {
    super(element);
    treeControlService.newTreeItem(this);
  }
}
