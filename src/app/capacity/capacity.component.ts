import {Component, Input} from '@angular/core';

@Component({
  selector: 'ub-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent {

  @Input() type: 'text' | 'icon';
  @Input() data: string;

}
