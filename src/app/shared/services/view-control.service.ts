import {ElementRef, Injectable, Renderer2} from '@angular/core';
import {ExtendedModelClass, ModelClass, SimpleModelClass} from '../../object-models/model.classes';

@Injectable()
export class ViewControlService {

  renderer: Renderer2;

  private draggableObject;
  private dragOverObject;
  private dragOverEl: ElementRef;
  private dragOverClientRect: ClientRect;
  private dragOverPrimaryBoxShadow: string;
  private firstHalf = true;

  dragStart(obj) {
    if (this.draggableObject === undefined) {
      this.dragOverObject = undefined;
      this.draggableObject = obj;
    }
  }

  dragEnter(obj, el: ElementRef) {
    this.dragClear();

    this.dragOverObject = obj;
    this.dragOverEl = el;
    this.dragOverClientRect = el.nativeElement.getBoundingClientRect();
    this.dragOverPrimaryBoxShadow = el.nativeElement.style.boxShadow;
  }

  dragOver(event: DragEvent) {
    if (this.draggableObject !== undefined && this.dragOverObject !== undefined) {
      this.drawContour(this.halfCalculation(event.clientX, event.clientY));
    }
  }

  dragEnd() {
    if (this.draggableObject !== undefined) {
      this.processMove(this.draggableObject, this.dragOverObject, this.firstHalf);
      this.draggableObject = undefined;
      this.dragClear();
    }
  }

  dragClear() {
    if (this.dragOverEl !== undefined) {
      this.dragOverObject = undefined;
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

  drawContour(toggle) {
    this.renderer.setStyle(
      this.dragOverEl.nativeElement,
      'boxShadow',
      toggle ? 'inset 3px 3px 5px 0px red' : 'inset -3px -3px 5px 0px red'
    );
  }

  halfCalculation(x, y): boolean {
    const result = ((x - this.dragOverClientRect.left)
      * (this.dragOverClientRect.top - this.dragOverClientRect.bottom)
      - (y - this.dragOverClientRect.bottom)
      * (this.dragOverClientRect.right - this.dragOverClientRect.left)) >= 0;

    this.firstHalf = result;
    return result;
  }

  processMove(component: ModelClass, target: ModelClass, firstHalf: boolean) {
    // console.log(target.parent.order);
    if (target instanceof SimpleModelClass) {
      if (component.parent === target.parent) {
        this.changeOrder(component, target, firstHalf, component.parent);
      } else {
        this.changeParent(component, target, firstHalf, target.parent);
      }
      target.parent.componentRef.instance.rerender().then();
    } else {

    }
    // console.log(target.parent?.order);
  }

  shiftOrder(component: ModelClass, shift: boolean, parent: ExtendedModelClass) {
    parent.order.splice(parent.order.indexOf(component.id), 1);
    shift ? parent.order.unshift(component.id) : parent.order.push(component.id);
  }

  changeParent(component: ModelClass, target: ModelClass, firstHalf: boolean, parent: ExtendedModelClass) {
    component.parent.order.splice(parent.order.indexOf(component.id), 1);
    component.parent.subObjectsList.delete(component.id);
    component.parent.componentRef.instance.rerender().then();

    component.parent = parent;

    const targetIndex = parent.order.indexOf(target.id);
    component.parent.subObjectsList.set(component.id, component);
    component.level = component.parent.level + 1;
    const insertionIndex = firstHalf ? targetIndex : targetIndex + 1;
    parent.order.splice(insertionIndex, 0, component.id);
  }

  changeOrder(component: ModelClass, target: ModelClass, firstHalf: boolean, parent: ExtendedModelClass) {
    const targetIndex = parent.order.indexOf(target.id);
    const insertionIndex = firstHalf ? targetIndex : targetIndex + 1;
    parent.order.splice(parent.order.indexOf(component.id), 1);
    parent.order.splice(insertionIndex, 0, component.id);
  }
}
