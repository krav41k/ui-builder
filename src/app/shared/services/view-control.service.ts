import {ElementRef, Injectable} from '@angular/core';
import {ComponentsStorageService} from './components-storage.service';
import {DraggableDirective} from '../directives/draggable.directive';

export interface ViewItem {
  viewDraggableDirective: DraggableDirective;
  viewDomComponent;
}

@Injectable()
export class ViewControlService {

  private rootRect: ClientRect;

  private draggableComponentId: number;
  private draggableClientRect: ClientRect;
  private dragOverComponentId: number;
  private dragOverClientRect: ClientRect;
  private dragOverPrimaryStyle: any;

  onPointerUp() {
    this.draggableComponentId = undefined;
  }

  constructor(private componentsStorageService: ComponentsStorageService) {}

  drag(id: number,  el: ElementRef) {
    if (this.draggableComponentId === undefined) {
      console.log(id);
      this.dragOverComponentId = undefined;
      this.draggableComponentId = id;
      this.draggableClientRect = el.nativeElement.getBoundingClientRect();
    }
  }

  dragOver(id, el, event) {
    if (this.dragOverComponentId === undefined && this.draggableComponentId !== undefined) {
      console.log('over');
      this.dragOverComponentId = id;
      console.log(el);
      this.dragOverClientRect = el.nativeElement.getBoundingClientRect();
    }
  }

  drop(id, el) {

  }

  onMouseMove(event: MouseEvent) {
    if (this.draggableComponentId !== undefined) {
      let element;
      let display;
      const item: HTMLElement = document.elementFromPoint(event.x, event.y) as HTMLElement;
      display = item.style.display;
      item.style.display = 'none';
      element = document.elementFromPoint(event.x, event.y);
      item.style.display = display;
      // this.viewControlService.dragOver(this.selfComponent.id, this.el, event);
      console.log(element);
    }
  }
}
