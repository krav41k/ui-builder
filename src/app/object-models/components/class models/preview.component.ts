import {AfterViewInit, Component, ElementRef} from '@angular/core';

import {propertyItems} from '../../../shared/data/property-items';
import {PropertyItem} from '../../../shared/interfaces/property-item';
import {Axis} from '../../../shared/classes/axis';
import {CdkDragMove} from '@angular/cdk/drag-drop';

@Component({
  selector: 'ub-preview-component',
  template: `<div></div>`
})
export class PreviewComponent implements AfterViewInit{

  el: ElementRef;
  childEl: ElementRef;
  blueprint;
  secondaryBlueprint;
  selfComponent: any;
  startPointer: Axis;
  pointer: Axis;

  ngAfterViewInit(): void {
    this.applyStyle(this.el, this.blueprint);
  }

  applyStyle(el: ElementRef, blueprint) {
    for (const item of blueprint) {
      el.nativeElement.style[item[0]] = item[1];
    }
  }

  processProperty(target: 'main' | 'child', propertyName: string, propertyValue: string) {
    let list: Map<string, PropertyItem>;
    if (target === 'main') {
      list = this.selfComponent.layoutPropertiesList;
    } else {
      list = this.selfComponent.componentPropertiesList;
    }

    let item = list.get(propertyName.toLowerCase());
    if (item) {
      item.value = propertyValue;
      this.changeStyle(target, item);
    } else {
      item = propertyItems.get(propertyName.toLowerCase());
      item.actualValue = item.value = item.previousValue = propertyValue;
      list.set(propertyName.toLowerCase(), item);
      this.changeStyle(target, item);
    }
  }

  changeStyle(target: 'main' | 'child', property: {name: string, value: string}) {
    if (target === 'main') {
      this.el.nativeElement.style[property.name] = property.value;
      this.selfComponent.style = this.el.nativeElement.style.cssText;
    } else {
      this.childEl.nativeElement.style[property.name] = property.value;
      this.selfComponent.childStyle = this.childEl.nativeElement.style.cssText;
    }
  }

  styleProcessing() {
    this.compMainStyleProcessing();
    if (this.childEl) {
      this.compSecondaryStyleProcessing();
    }
  }

  compMainStyleProcessing() {
    if (this.selfComponent.style === undefined) {
      this.applyStyle(this.el, this.blueprint);
      this.selfComponent.style = this.el.nativeElement.style.cssText;
    } else {
      this.el.nativeElement.style.cssText = this.selfComponent.style;
    }
  }

  compSecondaryStyleProcessing() {
    if (this.selfComponent.childStyle === undefined ) {
      this.applyStyle(this.childEl, this.secondaryBlueprint);
      this.selfComponent.childStyle = this.childEl.nativeElement.style.cssText;
    } else {
      this.childEl.nativeElement.style.cssText = this.selfComponent.childStyle;
    }
  }

  onCdkDragMove(event: CdkDragMove<any>) {
    if (this.startPointer) {
      this.pointer = event.pointerPosition;
    } else {
      this.startPointer = event.pointerPosition;
    }
  }
}
