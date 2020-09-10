import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {DialogExchangerComponent} from '../dialog-exchanger/dialog-exchanger.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(public componentsSS: ComponentsStorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  exportProject() {
    const data = this.componentsSS.getProjectJSON();
    this.openDialog('export', data, this.componentsSS.projectName);
  }

  importProject() {
    this.openDialog('import').afterClosed().subscribe(result => {
      if (result) {
        this.componentsSS.parseProjectJSON(result);
      }
    });
  }

  openDialog(procedure, data?, projectName?): MatDialogRef<any> {
    return this.dialog.open(DialogExchangerComponent, {data: {procedure, data, projectName}});
  }

  changeState(event) {
    this.componentsSS.eventsState$.next(event.checked);
  }
}
