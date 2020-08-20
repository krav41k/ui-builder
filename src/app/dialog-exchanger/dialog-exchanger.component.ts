import {AfterContentInit, AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'dialog-exchanger',
  templateUrl: './dialog-exchanger.component.html'
})
export class DialogExchangerComponent implements AfterViewInit {

  @ViewChild('downloadButton') downloadButEl: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

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
    });
    reader.readAsText(event.target.files[0]);
  }
}
