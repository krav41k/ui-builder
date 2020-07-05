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
  constructor(
    private resolver: ComponentFactoryResolver,
    private componentsStorageService: ComponentsStorageService,
    private viewControlService: ViewControlService,
    private renderer: Renderer2,
    private componentsSS: ComponentsStorageService
  ) {
    this.viewControlService.renderer = renderer;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.containerRef.clear();
    const factory = this.resolver.resolveComponentFactory(this.componentsStorageService.root.type);
    setTimeout(() => {
      this.componentsStorageService.root.componentRef = this.containerRef.createComponent(factory);
      this.componentsStorageService.root.componentRef.instance.component = this.componentsStorageService.root;
    });
  }

  @HostListener('document:pointerup') onWedding() {
    this.componentsSS.onPointerUp();
  }
}

