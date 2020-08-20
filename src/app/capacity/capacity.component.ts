import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ub-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {

  @Input() type: 'text' | 'icon';
  @Input() data: string;

  constructor() { }

  ngOnInit(): void {
  }

}
