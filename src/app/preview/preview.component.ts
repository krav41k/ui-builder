import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, Host,
  HostListener,
  OnInit, Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {ViewControlService} from '../shared/services/view-control.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) containerRef;

  @HostListener('dragenter') private onDragEnter() {
    this.viewControlService.dragClear();
  }

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewControlService: ViewControlService,
    private renderer: Renderer2,
    private componentsSS: ComponentsStorageService,
  ) {
    this.viewControlService.renderer = renderer;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.componentsSS.rootViewContainerRef = this.containerRef;
    this.componentsSS.resolver = this.resolver;
    this.componentsSS.initProject();
  }

  @HostListener('document:pointerup') onWedding() {
    this.componentsSS.onPointerUp();
  }
}

