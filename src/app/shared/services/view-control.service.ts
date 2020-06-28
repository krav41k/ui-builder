import {ElementRef, Injectable} from '@angular/core';
import {CDViewDraggableDirective} from '../directives/cd.view-draggable.directive';
import {ComponentsStorageService} from './components-storage.service';

export interface ViewItem {
  viewDirective: CDViewDraggableDirective;
  viewComponent;
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
export class ViewControlService {

  viewItemList: ViewItem[] = [];
  private  clientRects: ClientRect[];
  public floatComponent;
  private selectedItem: ElementRef;

  constructor(private componentsStorageService: ComponentsStorageService) {}


}
