import {Component, OnInit} from '@angular/core';

export class ComponentItem {
  title: string;
  tag: string;
}

@Component({
  selector: 'app-components-layout',
  templateUrl: './components-layout.component.html',
  styleUrls: ['./components-layout.component.scss']
})
export class ComponentsLayoutComponent implements OnInit {

  selectedCategory = 'Form Controls';
  selectedComponent = 'Autocomplete';
  dragging = false;
  selectedOrder = 'Category';

  public componentList: Map<string, ComponentItem[]>;

  constructor() {
    this.componentList = new Map<string, ComponentItem[]>([
      ['Form Controls', [
        {title: 'Autocomplete', tag: 'mat-autocomplete'},
        {title: 'Checkbox', tag: 'mat-checkbox'},
        {title: 'Datepicker', tag: 'mat-datepicker'},
        {title: 'Form field', tag: 'mat-form-field'},
        {title: 'Input', tag: 'mat-form-field'},
        {title: 'Radio button', tag: 'mat-radio-button'},
        {title: 'Select', tag: 'mat-select'},
        {title: 'Slider', tag: 'mat-slider'},
        {title: 'Slide toggle', tag: 'mat-slider-toggle'}
      ]],
      ['Navigation', [
        {title: 'Menu', tag: 'mat-menu'},
        {title: 'Sidenav', tag: ''},
        {title: 'Toolbar', tag: ''}
      ]],
      ['Layout', [
        {title: 'Card', tag: ''},
        {title: 'Divider', tag: ''},
        {title: 'Expansion Panel', tag: ''},
        {title: 'Grid list', tag: ''},
        {title: 'List', tag: ''},
        {title: 'Stepper', tag: ''},
        {title: 'Tabs', tag: ''},
        {title: 'Tree', tag: ''}
      ]],
      ['Buttons & Indicators', []],
      ['Popups & Modals', []],
      ['Data table', []]
    ]);
  }

  ngOnInit(): void {}

  onSelected(title: string, type: string) {
    switch (type) {
      case 'Category': {
        if (this.selectedCategory !== title) {
          this.selectedCategory = title;
          this.selectedComponent = this.componentList.get(title)[0].title;
        }
        this.selectedOrder = 'Category';
        break;
      }
      case 'Component': {
        this.selectedComponent = title;
        this.selectedOrder = 'Component';
        break;
      }
    }
  }

  onDragStart(title?: string, type?: string) {
    console.log('got drag start');
    if (title) {
      this.onSelected(title, 'Component');
    }
  }

  onDragMove() {
    console.log('got drag move');
  }

  onDragEnd() {
    console.log('got drag end');
  }
}
