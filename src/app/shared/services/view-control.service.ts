import {ElementRef, Injectable, Renderer2} from '@angular/core';
import {ComponentsStorageService} from './components-storage.service';
import {DraggableDirective} from '../directives/draggable.directive';

export interface ViewItem {
  viewDraggableDirective: DraggableDirective;
  viewDomComponent;
}

@Injectable()
export class ViewControlService {

  renderer: Renderer2;

  private draggableObject;
  private dragOverComponentObj;
  private dragOverEl: ElementRef;
  private dragOverClientRect: ClientRect;
  private dragOverPrimaryBoxShadow: string;

  onPointerUp() {
    this.dragClear();
    this.draggableObject = undefined;
  }

  constructor(private componentsStorageService: ComponentsStorageService) {}

  dragStart(obj) {
    if (this.draggableObject === undefined) {
      this.dragOverComponentObj = undefined;
      this.draggableObject = obj;
    }
  }

  dragEnter(obj, el: ElementRef) {
    console.log('drag enter');
    this.dragClear();

    this.dragOverComponentObj = obj;
    this.dragOverEl = el;
    this.dragOverClientRect = el.nativeElement.getBoundingClientRect();
    this.dragOverPrimaryBoxShadow = el.nativeElement.style.boxShadow;
  }

  dragOver(event: DragEvent) {
    if (this.draggableObject !== undefined && this.dragOverComponentObj !== undefined) {
     this.drawContour(event.clientX, event.clientY);
    }
  }

  dragClear() {
    if (this.dragOverEl !== undefined) {
      console.log(this.dragOverPrimaryBoxShadow);
      this.dragOverComponentObj = undefined;
      this.dragOverPrimaryBoxShadow === ''
        ? this.renderer.removeStyle(this.dragOverEl.nativeElement, 'boxShadow')
        : this.renderer.setStyle(this.dragOverEl.nativeElement, 'boxShadow', this.dragOverPrimaryBoxShadow);
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.draggableObject !== undefined) {
      let element;
      let display;
      const item: HTMLElement = document.elementFromPoint(event.x, event.y) as HTMLElement;
      display = item.style.display;
      item.style.display = 'none';
      element = document.elementFromPoint(event.x, event.y);
      item.style.display = display;
      // this.dragOver(this.selfComponent.id, this.el, event);
      console.log(element);
    }
  }

  drawContour(x, y) {
    console.log('draw');
    this.renderer.setStyle(this.dragOverEl.nativeElement, 'boxShadow',
      ((x - this.dragOverClientRect.left)
        * (this.dragOverClientRect.top - this.dragOverClientRect.bottom)
        - (y - this.dragOverClientRect.bottom)
        * (this.dragOverClientRect.right - this.dragOverClientRect.left))
      >= 0 ? 'inset 3px 3px 5px 0px red' : 'inset -3px -3px 5px 0px red'
    );
  }
}
