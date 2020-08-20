import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {SimpleComponent} from '../../model.classes';
import {ViewControlService} from '../../../shared/services/view-control.service';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cc-autocomplete',
  template: `
    <div draggable="true">
      <mat-form-field #coveredComponent>
        <input
          matInput type="text"
          [placeholder]="this.selfComponent.flexComponentData.get('placeholder').value"
          [disabled]="this.selfComponent.flexComponentData.get('disabled').value">
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCAutocompleteComponent extends SimpleComponent implements OnInit {

  blueprint = new Map<string, string>([]);
  secondaryBlueprint = new Map<string, string>([
    // ['backgroundColor', 'red']
  ]);

  constructor(
    viewControlService: ViewControlService,
    componentsStorageService: ComponentsStorageService,
    el: ElementRef,
    snackBar: MatSnackBar
  ) {
    super(viewControlService, componentsStorageService, el, snackBar);
  }

  ngOnInit(): void {
    if (this.selfComponent.flexComponentData === undefined) {
      this.selfComponent.flexComponentData = new Map<string, any>([
        ['disabled', {value: false, inputType: 'boolean'}],
        ['placeholder', {value: 'autocomplete', inputType: 'string'}]
      ]);
    }
  }
}
