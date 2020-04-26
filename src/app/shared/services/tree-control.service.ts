import {ComponentRef, ElementRef, Injectable, ViewContainerRef} from '@angular/core';
import {CDSortableDirective} from '../directives/cd.sortable.directive';
import {SortableDirective} from '../directives/sortable.directive';
import {ComponentsStorageService} from './components-storage.service';

export interface RotateEvent {
  currentIndex: number;
  rotateIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  );
};

const hCenter = (rect: ClientRect): number => {
  return rect.left + rect.width / 2;
};

const vCenter = (rect: ClientRect): number => {
  return rect.top + rect.height / 2;
};


@Injectable()
export class TreeControlService {

  treeDirectivesList: CDSortableDirective[] = [];
  private clientRects: ClientRect[];

  constructor(private componentsSS: ComponentsStorageService) {}

  public newTreeItem(item: CDSortableDirective) {
    console.log('+ subscribe');
    this.treeDirectivesList.push(item);
    item.dragStart.subscribe(() => {
      this.treeListFormation();
    });
    item.dragMove.subscribe((event) => {
      this.detectSorting(item, event);
    });
  }

  private treeListFormation() {
    this.clientRects = this.treeDirectivesList.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
    console.log('start drag');
  }

  private detectSorting(sortable: SortableDirective, event: PointerEvent) {
    const currentIndex = this.treeDirectivesList.indexOf(sortable);
    console.log(currentIndex);
    const currentRect = this.clientRects[currentIndex];
    this.clientRects
      .slice()
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .filter(rect => rect !== currentRect)
      .some(rect => {
        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ?
          rect.left < currentRect.left :
          rect.top < currentRect.top;

        const moveBack = isBefore && (isHorizontal ?
            event.clientX < hCenter(rect) :
            event.clientY < vCenter(rect)
        );

        const moveForward = !isBefore && (isHorizontal ?
            event.clientX > hCenter(rect) :
            event.clientY > vCenter(rect)
        );

        if (moveBack || moveForward) {
          const rotateIndex = this.clientRects.indexOf(rect);
          this.rotate({
            currentIndex,
            rotateIndex
          }, sortable, this.treeDirectivesList[rotateIndex]);
        }
      });
  }

  private rotate(event: RotateEvent, currentDirective, rotateDirective) {
    this.componentListRotate(event);
    this.directiveListRotate(event, currentDirective, rotateDirective);
  }

  private componentListRotate(event: RotateEvent) {
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
      console.log(`order after = ${currentComp.parent.order}`);
      currentComp.parent.componentRef.instance.rerender();
      this.treeListFormation();
    }
  }

  private directiveListRotate(event , currentDirective, rotateDirective) {
    this.treeDirectivesList[event.currentIndex] = rotateDirective;
    this.treeDirectivesList[event.rotateIndex] = currentDirective;
  }
}
