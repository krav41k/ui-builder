import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';

import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ub-components-tree',
  templateUrl: './components-tree.component.html',
  styleUrls: ['./components-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTreeComponent implements OnDestroy {

  componentsUpdateSub: Subscription;

  constructor(
    public componentsSS: ComponentsStorageService,
    private cdr: ChangeDetectorRef,
  ) {
    this.componentsUpdateSub = this.componentsSS.components$.subscribe(() => {
      setTimeout(() =>  this.cdr.detectChanges(), 0);
    });
  }

  ngOnDestroy(): void {
    this.componentsUpdateSub.unsubscribe();
  }
}
