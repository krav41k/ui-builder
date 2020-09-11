import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {ExtendedModelClass} from '../object-models/components/class models/extended-model.class';
import {PropertyItem} from '../shared/interfaces/property-item';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {propertyItems} from '../shared/data/property-items';
import {ComponentClass} from '../object-models/components/class models/model.interface';

@Component({
  selector: 'ub-component-manager',
  templateUrl: './component-manager.component.html',
  styleUrls: ['./component-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentManagerComponent implements OnInit, OnDestroy {

  // sc - selected component
  visibility = true;
  selectedComponent: ComponentClass;
  scId: number;
  scName: string;
  scIsSimple: boolean; // true - simple, false - extended
  content: any;
  private subSelectedCompChange: Subscription;

  layoutPropertiesList: Map<string, PropertyItem> = null;
  componentPropertiesList: Map<string, PropertyItem> = null;

  filterEmitter: EventEmitter<any> = new EventEmitter<any>();
  filteredProperties$: Observable<any> = new Observable<any>(subscriber => {
    this.filterEmitter.subscribe((obj: {value: string, list: Map<string, PropertyItem> | string[]}) => {
      Array.isArray(obj.list)
        ? subscriber.next(this.filterListByMatches(obj.value, obj.list))
        : subscriber.next(this.filterListByMatches(obj.value, Array.from(obj.list.values(), item => item.name)));
    });
  });

  allPropertiesList: Map<string, PropertyItem> = propertyItems;
  allProperties: PropertyItem[];

  constructor(
    private cdr: ChangeDetectorRef,
    public componentsSS: ComponentsStorageService,
  ) {
    this.subSelectedCompChange = componentsSS.selectedComponents$.subscribe((component) => {
      if (this.selectedComponent === component) {
        return false;
      }

      this.selectedComponent = component;

      this.scId = component.id;
      this.scName = component.name;
      this.scIsSimple = !(component instanceof ExtendedModelClass);
      this.content = component.flexComponentData?.get('content');
      if (!(component.layoutPropertiesList && component.componentPropertiesList)) {
        this.createList();
        this.styleParser(this.selectedComponent.style, component.layoutPropertiesList);
        this.styleParser(this.selectedComponent.childStyle, component.componentPropertiesList);
      }
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.allProperties = Array.from(this.allPropertiesList.values());
  }

  ngOnDestroy(): void {
    this.subSelectedCompChange.unsubscribe();
  }

  createList() {
    this.selectedComponent.componentPropertiesList = new Map<string, PropertyItem>([
      ['backgroundcolor', {name: 'backgroundColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ]);

    this.selectedComponent.layoutPropertiesList = new Map<string, PropertyItem>([
      ['layoutwidth', {name: 'layoutWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
      ['layoutheight', {name: 'layoutHeight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
      ['flex', {name: 'flex', inputType: 'string', actualValue: null, value: null, previousValue: null}],
      ['display', {
        name: 'display',
        inputType: 'complete',
        availableValues: ['block', 'inline', 'inline-block', 'inline-table', 'list-item', 'none', 'run-in', 'table', 'table-caption',
          'table-cell', 'table-column-group', 'table-column', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group'],
        actualValue: null, value: null, previousValue: null
      }],
    ]);

    return true;
  }

  styleParser(text, list: Map<string, PropertyItem>) {
    if (text !== '') {
      const clearText = text.replace(/-/g, '').slice(0, -1);
      const properties = clearText.split('; ');
      properties.forEach(property => {
        const parsedProperty = property.split(': ');
        const propertyItem = this.allPropertiesList.get(parsedProperty[0]);
        list.set(parsedProperty[0], propertyItem);
        propertyItem.actualValue = propertyItem.value = propertyItem.previousValue = parsedProperty[1];
      });
    }
  }

  applyInput(pItem: PropertyItem, target) {
    this.selectedComponent.componentRef.instance.changeStyle(target, pItem);
    pItem.previousValue = pItem.actualValue;
    pItem.actualValue = pItem.value;
  }

  cancelInput(obj: PropertyItem) {
    obj.value = obj.actualValue;
  }

  filterListByMatches(value: string, list: string[]): any {
    const filterValue = value.toLowerCase();
    return list.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  onFocus(event: FocusEvent, list: Map<string, PropertyItem>) {
    this.filterEmitter.emit({value: (event.target as HTMLInputElement).value, list});
  }

  onInput(event: InputEvent, list: Map<string, PropertyItem>) {
    this.filterEmitter.emit({value: (event.target as HTMLInputElement).value, list});
    this.cdr.detectChanges();
  }

  addContent() {
    const content = this.selectedComponent.flexComponentData.get('content');
    const newEntity = {};
    content.requiredFields.forEach(item => {
      newEntity[item.name] = item.value;
    });
    content.value.push(newEntity);
  }
}
