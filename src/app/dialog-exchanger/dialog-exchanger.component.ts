import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'ub-dialog-exchanger',
  templateUrl: './dialog-exchanger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogExchangerComponent implements AfterViewInit {

  @ViewChild('downloadButton') downloadButEl: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.downloadButEl?.nativeElement.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data.data))
    );
    this.downloadButEl?.nativeElement.setAttribute('download', this.data.projectName + '.txt');
  }

  handleFile(event) {
    const reader = new FileReader();
    reader.addEventListener('loadend', (loadendEvent) => {
      this.data.data = loadendEvent.target.result;
      this.cdr.detectChanges();
    });
    reader.readAsText(event.target.files[0]);
  }
}
