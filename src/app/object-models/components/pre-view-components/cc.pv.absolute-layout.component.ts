import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {PreviewComponent} from '../class models/preview.component';

@Component({
  selector: 'cc-preview-absolute-layout',
  template: `
    <ng-container #container>Absolute layout</ng-container>
  `,
})
export class CCPVAbsoluteLayoutComponent extends PreviewComponent implements AfterViewInit {
  blueprint = new Map<string, string>([
    ['padding', '50px'],
    ['border', 'black dotted 1px'],
  ]);

  constructor( public el: ElementRef ) {
    super();
  }

  ngAfterViewInit() {
    this.applyStyle(this.el, this.blueprint);
  }
}
