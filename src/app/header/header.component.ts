import { Component, OnInit } from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public componentsSS: ComponentsStorageService) { }

  ngOnInit(): void {
  }

  changeState(event) {
    this.componentsSS.eventsStatusSteam$.next(event.checked);
  }
}
