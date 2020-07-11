import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Subscription} from 'rxjs';
import {ComponentItem} from '../components-layout/components-layout.component';
import {ExtendedModelClass, SimpleModelClass} from '../object-models/model.classes';

interface StyleItem {
  actualStyle: string;
  floatStyle: string;
  previousStyle: string;
}

@Component({
  selector: 'app-component-manager',
  templateUrl: './component-manager.component.html',
  styleUrls: ['./component-manager.component.scss']
})
export class ComponentManagerComponent implements OnInit, OnDestroy {

  // sc - selected component
  public visibility = true;
  public selectedComponent;
  public scId;
  public scName;
  public scType; // true - simple, false - extended
  sub: Subscription;

  layoutPropertyList = new Map<string, StyleItem>([
    ['layoutWidth', null],
    ['layoutHeight', null],
    ['flex', null],
  ]);

  componentPropertyList = new Map<string, StyleItem>([
    ['backgroundColor', null],
  ]);

  constructor(
    componentsSS: ComponentsStorageService,
  ) {
    this.sub = componentsSS.selectedComponentsSteam$.subscribe((component) => {
      if (this.selectedComponent === component) {
        return false;
      }
      this.selectedComponent = component;
      console.log(component);
      this.scType = !(component instanceof ExtendedModelClass);
      this.selectedComponent = component;
      this.scName = component.name;
      this.scId = component.id;
      if (this.scType) {
        this.styleParser(this.selectedComponent.style, this.layoutPropertyList);
        this.styleParser(this.selectedComponent.childrenStyle, this.componentPropertyList);
      }
    });
  }

  ngOnInit(): void {
    // this.styleParser(this.selectedComponent.style, this.layoutPropertyList);
    for (const item of this.componentPropertyList.entries()) {
      console.log(item);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  styleParser(text, list) {
    const clearText = text.replace(/-/g, '').slice(0, -1);
    console.log(clearText);
    const properties = clearText.split('; ');
    console.log(properties);
  }
}
