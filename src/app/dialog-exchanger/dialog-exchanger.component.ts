import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-exchanger',
  templateUrl: './dialog-exchanger.component.html'
})
export class DialogExchangerComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
