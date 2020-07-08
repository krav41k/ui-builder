import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-component-manager',
  templateUrl: './component-manager.component.html',
  styleUrls: ['./component-manager.component.scss']
})
export class ComponentManagerComponent implements OnInit, OnDestroy {

  public visibility = true;
  sub: Subscription;

  constructor(
    componentsSS: ComponentsStorageService,
  ) {
    this.sub = componentsSS.selectedComponentsSteam$.subscribe((component) => {
      console.log(component);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
