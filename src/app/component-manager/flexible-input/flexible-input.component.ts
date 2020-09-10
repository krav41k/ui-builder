import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ub-flexible-input',
  templateUrl: './flexible-input.component.html',
  styleUrls: ['./flexible-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexibleInputComponent {

  @Input() label: string;
  @Input() data;
  @Input() inputType;
  @Input() key;

}
