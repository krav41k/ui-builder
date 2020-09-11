import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

import {ExtendedModelClass} from '../object-models/components/class models/extended-model.class';

@Component({
  selector: 'ub-tree-branch',
  templateUrl: './tree-branch.component.html',
  styleUrls: ['./components-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeBranchComponent implements AfterContentInit {

  branch: ExtendedModelClass;
  toggleSymbol: '+'|'-' = '-';

  @Input() set tree(tree: ExtendedModelClass) {
    tree.subComponentsList.forEach(item => {
      item.level = tree.level + 1;
    });
    this.branch = tree;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.toggle(!this.branch.nestedSwitch);
  }

  toggle(toggle) {
    if (toggle) {
      this.branch.nestedSwitch = false;
      this.toggleSymbol = '+';
    } else {
      this.branch.nestedSwitch = true;
      this.toggleSymbol = '-';
    }
    this.cdr.detectChanges();
  }
}

