import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  Injectable,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {FlatTreeControl} from '@angular/cdk/tree';
import {ArrayDataSource} from '@angular/cdk/collections';
import {ExtendedModelClass, ModelInterface, SimpleModelClass} from '../object-models/model.classes';
import {SortableDirective} from '../shared/directives/sortable.directive';
import {CDSortableDirective} from '../shared/directives/cd.sortable.directive';
import {TreeBranchComponent} from './tree-branch.component';
import {RotateEvent} from '../shared/services/tree-control.service';

@Component({
  selector: 'app-components-tree',
  templateUrl: './components-tree.component.html',
  styleUrls: ['./components-tree.component.scss']
})
export class ComponentsTreeComponent implements OnInit, OnDestroy {

  actualComponentList;

  constructor(public componentsSS: ComponentsStorageService) {
    this.componentsSS.componentsSteam$.subscribe(value => {
      // console.log('Subscribe: ', value);
      this.actualComponentList = value;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentsSS.componentsSteam$.unsubscribe();
  }

  rotate(event: RotateEvent) {
    const currentComp = this.componentsSS.componentsList.get(event.currentIndex + 1);
    const rotateComp = this.componentsSS.componentsList.get(event.rotateIndex + 1);
    if (currentComp.parent.id === rotateComp.parent.id) {
      const currentValue = currentComp.parent.order[event.currentIndex];
      const rotateValue = currentComp.parent.order[event.rotateIndex];
      console.log(`current order index ${event.currentIndex}, current value ${currentValue}`);
      console.log(`rotate order index ${event.rotateIndex}, rotate value ${rotateValue}`);
      console.log(`order before = ${currentComp.parent.order}`);
      currentComp.parent.order[event.rotateIndex] = currentValue;
      currentComp.parent.order[event.currentIndex] = rotateValue;
      // console.log(`order after = ${this.componentsSS.root.order}`);
      console.log(`order after = ${currentComp.parent.order}`);
      // currentComp.parent.rerender(currentComp.parent);
      // currentComp.parent.instance.
      currentComp.parent.componentRef.instance.rerender();
    }
  }
}
