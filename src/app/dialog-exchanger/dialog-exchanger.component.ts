import {Component} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';

@Component({
  selector: 'dialog-exchanger',
  templateUrl: './dialog-exchanger.component.html'
})
export class DialogExchangerComponent {
  constructor(
    public componentsSS: ComponentsStorageService,
  ) {

  }
}
