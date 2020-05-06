import {
  AfterContentInit,
  Component,
  Input,
} from '@angular/core';
import {ExtendedModelClass} from '../object-models/model.classes';
import {TreeControlService} from '../shared/services/tree-control.service';

@Component({
  selector: 'tree-branch',
  template: `
    <div cdSortable [sortableComponent]="branch" class="list-item">
      <div class="tree-branch-toggle" (click)="toggle()">{{toggleSymbol}}</div>
      {{branch.name}}
    </div>
    <ng-template [ngIf]="branch.nestedSwitch">
      <ng-template ngFor let-item [ngForOf]="branch.order">
        <ng-template
            [ngIf]="branch.subObjectsList.get(item).order !== undefined"
            [ngIfThen]="extendedBranch"
            [ngIfElse]="simpleBranch"
        ></ng-template>
        <ng-template #extendedBranch>
          <tree-branch [tree]="branch.subObjectsList.get(item)"></tree-branch>
        </ng-template>
        <ng-template #simpleBranch>
          <div cdSortable [sortableComponent]="branch.subObjectsList.get(item)" class="list-item">
            {{branch.subObjectsList.get(item).name}}
          </div>
        </ng-template>
      </ng-template>
    </ng-template>
  `,
  styleUrls: ['./components-tree.component.scss']
})
export class TreeBranchComponent implements AfterContentInit {

  branch: ExtendedModelClass;
  toggleSymbol = '-';

  @Input() set tree(tree: ExtendedModelClass) {
    this.branch = tree;
  }

  constructor(private treeControlService: TreeControlService) {}

  ngAfterContentInit(): void {
    this.toggle();
    this.toggle();
  }

  toggle() {
    if (this.branch.nestedSwitch === true) {
      this.branch.nestedSwitch = false;
      this.toggleSymbol = '+';
    } else {
      this.branch.nestedSwitch = true;
      this.toggleSymbol = '-';
    }
  }
}

