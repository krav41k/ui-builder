import {Component, Input} from '@angular/core';

@Component({
  selector: 'flexible-input',
  templateUrl: './flexible-input.component.html',
  styleUrls: ['./flexible-input.component.scss'],
})
export class FlexibleInputComponent {

  @Input() label: string;
  @Input() data;
  @Input() inputType;
  @Input() key;

}
