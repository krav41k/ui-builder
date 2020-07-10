import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-component-manager',
  templateUrl: './component-manager.component.html',
  styleUrls: ['./component-manager.component.scss']
})
export class ComponentManagerComponent implements OnInit, OnDestroy {

  // sc - selected component
  public visibility = true;
  public scId;
  public scName;
  public selectedComponent;
  sub: Subscription;

  // layout

  layoutWidth = '100%';
  layoutHeight = '100%';

  constructor(
    componentsSS: ComponentsStorageService,
  ) {
    this.sub = componentsSS.selectedComponentsSteam$.subscribe((component) => {
      console.log(component);
      console.log(component.type);
      this.selectedComponent = component;
      this.scName = component.name;
      this.scId = component.id;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
