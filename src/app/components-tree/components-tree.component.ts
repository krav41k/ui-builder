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
import {RotateEvent} from '../shared/directives/sortable-list.directive';
import {CDSortableDirective} from '../shared/directives/cd.sortable.directive';
import {TreeBranchComponent} from './tree-branch.component';

@Component({
  selector: 'app-components-tree',
  templateUrl: './components-tree.component.html',
  styleUrls: ['./components-tree.component.scss']
})
export class ComponentsTreeComponent implements OnInit, OnDestroy {

  actualComponentList;

  constructor(public componentsSS: ComponentsStorageService) {
    this.componentsSS.componentsSteam$.subscribe(value => {
      console.log('Subscribe: ', value);
      this.actualComponentList = value;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentsSS.componentsSteam$.unsubscribe();
  }

  rotate(event: RotateEvent) {
    const currentComp = this.componentsSS.componentsList.get(event.currentIndex);
    const rotateComp = this.componentsSS.componentsList.get(event.newIndex);
    console.log(event);
    if (currentComp.parent.id === rotateComp.parent.id) {
      const currentIndex = currentComp.parent.order.indexOf(event.currentIndex);
      const rotateIndex = currentComp.parent.order.indexOf(event.newIndex);
      console.log(`current order index ${currentIndex}`);
      console.log(`rotate order index ${rotateIndex}`);
      console.log(`order before = ${currentComp.parent.order}`);
      currentComp.parent.order[rotateIndex] = event.currentIndex;
      currentComp.parent.order[currentIndex] = event.newIndex;
      // console.log(`order after = ${this.componentsSS.root.order}`);
      console.log(`order after = ${currentComp.parent.order}`);
    }
  }
}
