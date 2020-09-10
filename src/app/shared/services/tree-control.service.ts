import {ElementRef, Injectable} from '@angular/core';
import {CDSortableDirective} from '../directives/cd.sortable.directive';
import {ComponentClass} from '../../object-models/components/class models/model.interface';

export interface TreeItem {
  sortableDirective: CDSortableDirective;
  sortableComponent: ComponentClass;
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

  public changeSelectedItem(el: ElementRef) {
    if (this.selectedItem !== el) {
      if (this.selectedItem) {
        this.selectedItem.nativeElement.classList.remove('selected');
      }
      el.nativeElement.classList.add('selected');
      this.selectedItem = el;
      this.floatComponent = null;
    }
  }

  public newTreeItem(directive: CDSortableDirective, component: ComponentClass) {
    const index = this.treeItemList.findIndex(item => item.sortableComponent === component);
    if (index === -1) {
      this.treeItemList.push({sortableDirective: directive, sortableComponent: component});
    } else {
      this.treeItemList[index].sortableDirective.dragStart.unsubscribe();
      this.treeItemList[index].sortableDirective.dragMove.unsubscribe();

      this.treeItemList[index].sortableDirective = directive;
      if (component === this.floatComponent) {
        this.changeSelectedItem(directive.el);
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

  removeTreeItem(directive: CDSortableDirective, component) {
    this.treeItemList.filter(item => item.sortableComponent === component);
    directive.dragStart.unsubscribe();
    directive.dragMove.unsubscribe();
  }

  private treeListFormation() {
    this.clientRects = this.treeItemList.map(sortable => sortable.sortableDirective.el.nativeElement.getBoundingClientRect());
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
    this.swapComponents(currentComponent.sortableComponent, rotateComponent.sortableComponent);
    this.treeListFormation();
    this.directiveListRotate(event, currentComponent, rotateComponent);
  }

  private directiveListRotate(event , currentComponent, rotateComponent) {
    this.treeItemList[event.currentIndex] = rotateComponent;
    this.treeItemList[event.rotateIndex] = currentComponent;
  }

  // Перемещение компонента
  swapComponents(firstComponent, secondComponent) {
    let updater = false;
    if (firstComponent === secondComponent.parent) {
      return false;
    } else if (secondComponent.nestedSwitch) {
      if (firstComponent.parent === secondComponent) {
        updater = this.changeParent(firstComponent, secondComponent, false);
      } else {
        updater = this.changeParent(firstComponent, secondComponent, true);
      }
    } else if (firstComponent.level === secondComponent.level) {
      updater = this.changeOrder(firstComponent, secondComponent);
    } else {
      updater = this.changeParent(firstComponent, secondComponent, false);
    }

    if (updater) {
      firstComponent.parent.componentRef.instance.rerender().then();
    }
  }

  changeParent(firstComponent, secondComponent, insertionOrder: boolean): boolean {
    const parentOrderIndex = secondComponent.parent.order.indexOf(secondComponent.id);
    firstComponent.parent.order = firstComponent.parent.order.filter(id => id !== firstComponent.id);
    firstComponent.parent.subComponentsList.delete(firstComponent.id);

    firstComponent.parent.componentRef.instance.rerender().then();

    if (insertionOrder) {
      firstComponent.parent = secondComponent;
      firstComponent.level = secondComponent.level + 1;

      firstComponent.parent.order.unshift(firstComponent.id);
      // firstComponent.parent.order.splice(parentOrderIndex - 1, 0, firstComponent.id);

    } else {
      firstComponent.parent = secondComponent.parent;
      firstComponent.level = secondComponent.level;

      // firstComponent.parent.order.push(firstComponent.id);
      firstComponent.parent.order.splice(parentOrderIndex, 0, firstComponent.id);
    }

    firstComponent.parent.subComponentsList.set(firstComponent.id, firstComponent);
    return true;
  }

  changeOrder(firstComponent, secondComponent): boolean {
    const firstOrderIndex = firstComponent.parent.order.indexOf(firstComponent.id);
    const secondOrderIndex = secondComponent.parent.order.indexOf(secondComponent.id);
    firstComponent.parent.order[secondOrderIndex] = firstComponent.id;
    firstComponent.parent.order[firstOrderIndex] = secondComponent.id;

    return true;
  }
}
