import {ElementRef, Injectable, Renderer2} from '@angular/core';
import {ComponentsStorageService} from './components-storage.service';
import {ComponentClass} from '../../object-models/components/class models/model.interface';
import {ExtendedModelClass} from '../../object-models/components/class models/extended-model.class';


@Injectable()
export class ViewControlService {

  public renderer: Renderer2;

  private draggableObject;
  private dragOverObject;
  public draggableClientRect: ClientRect;
  private dragOverEl: ElementRef;
  private dragOverClientRect: ClientRect;
  private dragOverPrimaryBoxShadow: string;
  private firstHalf = true;

  constructor(private componentsSS: ComponentsStorageService) {}

  dragStart(obj, el: ElementRef) {
    if (this.draggableObject === undefined) {
      this.dragOverObject = undefined;
      this.draggableObject = obj;
      this.draggableClientRect = el.nativeElement.getBoundingClientRect();
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

  dragEnd(event?: PointerEvent) {
    if (this.draggableObject !== undefined) {
      if (event !== undefined) {
        const dragOverObject = this.findObject(event);
        if (dragOverObject !== undefined) {
          this.processMove(this.draggableObject, dragOverObject, this.firstHalf, event);
        }
      } else if (this.dragOverObject !== undefined) {
        this.processMove(this.draggableObject, this.dragOverObject, this.firstHalf);
        this.dragClear();
      }
      this.draggableObject = undefined;
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

  // function for find elements under another not children element
  // onMouseMove(event: MouseEvent) {
  //   if (this.draggableObject !== undefined) {
  //     if (!this.checkZone(event.x, event.y)) {
  //       let element;
  //       let display;
  //       const item: HTMLElement = document.elementFromPoint(event.x, event.y) as HTMLElement;
  //       display = item.style.display;
  //       item.style.display = 'none';
  //       element = document.elementFromPoint(event.x, event.y);
  //       item.style.display = display;
  //       console.log(element.id);
  //       console.log(this.componentsSS.componentsList.get(element));
  //     }
  //   }
  // }

  findObject(event: PointerEvent): ComponentClass {
    if (!this.checkZone(event.x, event.y)) {
      let element;
      // let display;
      // const item: HTMLElement = document.elementFromPoint(event.x, event.y) as HTMLElement;
      // display = item.style.display;
      // item.style.display = 'none';
      element = document.elementFromPoint(event.x, event.y) as HTMLElement;
      // item.style.display = display;
      return element.id !== '' ? this.componentsSS.componentsList.get(+element.id) : undefined;
    }
  }

  checkZone(x, y): boolean {
    const draggableCR = this.draggableClientRect;
    return draggableCR.left < x && draggableCR.right > x ? draggableCR.top < y && draggableCR.bottom > y : false;
  }

  processMove(component: ComponentClass, target: ComponentClass, firstHalf: boolean, event?: PointerEvent) {
    // if (event !== undefined && this.checkZone(event.x, event.y)) {
    //     return false;
    // }
    if (!(target instanceof ExtendedModelClass)) {
      if (component.parent === target.parent) {
        this.changeOrder(component, target, firstHalf, component.parent);
      } else {
        this.changeParent(component, firstHalf, target.parent, target);
      }
    } else {
      if (component.parent.id === target.id) {
        this.shiftOrder(component, firstHalf, target);
      } else {
        this.changeParent(component, firstHalf, target);
      }
    }
  }


  shiftOrder(component: ComponentClass, shift: boolean, parent: ExtendedModelClass) {
    parent.order.splice(parent.order.indexOf(component.id), 1);
    shift ? parent.order.unshift(component.id) : parent.order.push(component.id);
    parent.componentRef.instance.rerender().then();
  }

  changeParent(component: ComponentClass, firstHalf: boolean, parent: ExtendedModelClass, target?: ComponentClass) {
    component.parent.order.splice(component.parent.order.indexOf(component.id), 1);
    component.parent.subComponentsList.delete(component.id);
    component.parent.componentRef.instance.rerender().then();

    component.parent = parent;

    if (target !== undefined) {
      const targetIndex = parent.order.indexOf(target.id);
      const insertionIndex = firstHalf ? targetIndex : targetIndex + 1;
      parent.order.splice(insertionIndex, 0, component.id);
    } else {
      firstHalf ? parent.order.unshift(component.id) : parent.order.push(component.id);
    }
    component.parent.subComponentsList.set(component.id, component);
    component.level = component.parent.level + 1;
    parent.componentRef.instance.rerender().then();
  }

  changeOrder(component: ComponentClass, target: ComponentClass, firstHalf: boolean, parent: ExtendedModelClass) {
    const targetIndex = parent.order.indexOf(target.id);
    const insertionIndex = firstHalf ? targetIndex : targetIndex + 1;
    parent.order.splice(parent.order.indexOf(component.id), 1);
    parent.order.splice(insertionIndex, 0, component.id);
    parent.componentRef.instance.rerender().then();
  }
}
