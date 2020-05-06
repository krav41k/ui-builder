import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {CDSortableDirective} from '../directives/cd.sortable.directive';
import {ComponentsStorageService} from './components-storage.service';

export interface TreeItem {
  sortableDirective: CDSortableDirective;
  sortableComponent;
}

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

  treeItemList: TreeItem[] = [];
  private clientRects: ClientRect[];
  public floatComponent;
  private selectedItem: ElementRef;

  constructor(private componentsSS: ComponentsStorageService) {}

  public changeSelectedItem(el: ElementRef) {
    if (this.selectedItem !== el) {
      if (this.selectedItem !== undefined) {
        this.selectedItem.nativeElement.classList.remove('selected');
      }
      el.nativeElement.classList.add('selected');
      this.selectedItem = el;
      this.floatComponent = null;
    }
  }

  public newTreeItem(directive: CDSortableDirective, component) {
    const index = this.treeItemList.findIndex(item => item.sortableComponent === component);
    if (index === -1) {
      this.treeItemList.push({sortableDirective: directive, sortableComponent: component});
    } else {
      this.treeItemList[index].sortableDirective.dragStart.unsubscribe();
      this.treeItemList[index].sortableDirective.dragMove.unsubscribe();

      this.treeItemList[index].sortableDirective = directive;
      if (component === this.floatComponent) {
        this.changeSelectedItem(directive.element);
        directive.dragging = true;
      }
    }
    directive.dragStart.subscribe(() => {
      this.treeListFormation();
    });
    directive.dragMove.subscribe((event) => {
      this.detectSorting(directive, event);
    });
  }

  private treeListFormation() {
    this.clientRects = this.treeItemList.map(sortable => sortable.sortableDirective.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(directive: CDSortableDirective, event: PointerEvent) {
    const currentIndex = this.treeItemList.findIndex(item => item.sortableDirective === directive);
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
          }, this.treeItemList[currentIndex], this.treeItemList[rotateIndex]);
        }
      });
  }

  private rotate(event: RotateEvent, currentComponent, rotateComponent) {
    this.floatComponent = currentComponent.sortableComponent;
    this.componentsSS.swapComponents(currentComponent.sortableComponent, rotateComponent.sortableComponent);
    this.treeListFormation();
    this.directiveListRotate(event, currentComponent, rotateComponent);
  }

  private directiveListRotate(event , currentComponent, rotateComponent) {
    this.treeItemList[event.currentIndex] = rotateComponent;
    this.treeItemList[event.rotateIndex] = currentComponent;
  }
}
