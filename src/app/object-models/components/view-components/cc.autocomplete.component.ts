import {Component, ElementRef, OnInit} from '@angular/core';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleComponent} from '../class models/simple.component';
import {DomSanitizer} from '@angular/platform-browser';

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
    componentsStorageService: ComponentsStorageService,
    el: ElementRef,
    sanitizer: DomSanitizer,
    snackBar: MatSnackBar
  ) {
    super(componentsStorageService, el, sanitizer, snackBar);
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
