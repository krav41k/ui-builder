import {
  AfterViewInit,
  ContentChildren,
  Directive,
  EventEmitter, Output,
  QueryList,
} from '@angular/core';
import {SortableDirective} from './sortable.directive';
import {CDSortableDirective} from './cd.sortable.directive';
import {RotateEvent} from '../services/tree-control.service';

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

@Directive({
  selector: '[cdSortableList]'
})
export class SortableListDirective implements AfterViewInit {

  listLength: number;
  @ContentChildren(CDSortableDirective, {descendants: true}) sortables: QueryList<SortableDirective>;

  @Output() rotate = new EventEmitter<RotateEvent>();

  private clientRects: ClientRect[];

  ngAfterViewInit(): void {
    this.listLength = this.sortables.length;
    this.sortables.changes.subscribe((queryChanges) => {
      console.log(queryChanges);
      if (this.listLength < this.sortables.length) {
        console.log('+1 сабскрайб');
        const changesComponent = this.sortables.last;
        changesComponent.dragStart.subscribe(() => this.measureClientRects());
        changesComponent.dragMove.subscribe((event) => this.detectSorting(changesComponent, event));
        this.listLength++;
      }
    });

    this.sortables.forEach(sortable => {
      console.log('for each subscribe');
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe((event) => this.detectSorting(sortable, event));
    });
  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
    console.log(`start drag`);
    console.log(this.sortables);
  }

  private detectSorting(sortable: SortableDirective, event: PointerEvent) {
    const currentIndex = this.sortables.toArray().indexOf(sortable);
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
          this.rotate.emit({
            currentIndex,
            rotateIndex: this.clientRects.indexOf(rect)
          });
        }
      });
  }
}

