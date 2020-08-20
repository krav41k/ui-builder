import {
  Component,
  OnDestroy,
  OnInit, Renderer2,
} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {TreeControlService} from '../shared/services/tree-control.service';

@Component({
  selector: 'app-components-tree',
  templateUrl: './components-tree.component.html',
  styleUrls: ['./components-tree.component.scss']
})
export class ComponentsTreeComponent implements OnInit, OnDestroy {

  actualComponentList;

  constructor(public componentsSS: ComponentsStorageService) {
    this.componentsSS.components$.subscribe(value => {
      this.actualComponentList = value;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentsSS.components$.unsubscribe();
  }
}
