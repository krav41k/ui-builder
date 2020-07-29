import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {SimpleComponentClass} from '../../model.classes';
import {ViewControlService} from '../../../shared/services/view-control.service';
import {ComponentsStorageService} from '../../../shared/services/components-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cc-autocomplete',
  template: `
    <div draggable="true">
      <mat-form-field #coveredComponent>
        <input matInput type="text" placeholder="text" [disabled]="this.selfComponent.flexComponentData.get('disabled').value">
<!--        <mat-autocomplete #autoPropertyGroup="matAutocomplete">-->
<!--          <mat-option *ngFor="let property of filteredPropertiesObservable | async" [value]="property">-->
<!--            {{property}}-->
<!--          </mat-option>-->
<!--        </mat-autocomplete>-->
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./style.scss']
})
export class CCAutocompleteComponent extends SimpleComponentClass implements OnInit, AfterViewInit {

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
        ['disabled', {value: false, inputType: 'boolean'}]
      ]);
    }
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.id = this.selfComponent.id;
    this.styleProcessing();
  }
}
