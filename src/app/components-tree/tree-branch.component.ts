import {
  AfterContentInit, AfterViewInit,
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
import {RotateEvent} from '../shared/directives/sortable-list.directive';
import {CDSortableDirective} from '../shared/directives/cd.sortable.directive';
import {SortableDirective} from '../shared/directives/sortable.directive';

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

  @Output() rotate = new EventEmitter<RotateEvent>();
}

