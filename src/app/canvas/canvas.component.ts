import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit, Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';

@Component({
  selector: 'ub-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) containerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private componentsSS: ComponentsStorageService,
  ) {}

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

