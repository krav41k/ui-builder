import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ExtendedModelClass} from '../object-models/model.classes';
import {CDSortableDirective} from '../shared/directives/cd.sortable.directive';
import {SortableDirective} from '../shared/directives/sortable.directive';
import {RotateEvent} from '../shared/services/tree-control.service';

@Component({
  selector: 'tree-branch',
  templateUrl: './tree-branch.component.html',
  styleUrls: ['./tree-branch.component.scss']
})
export class TreeBranchComponent {

  branch: ExtendedModelClass;

  @Input() set tree(tree: ExtendedModelClass) {
    this.branch = tree;
  }
}

