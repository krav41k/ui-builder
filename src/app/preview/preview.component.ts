import {
  AfterContentInit,
  AfterViewInit,
  Component, ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  ElementRef, HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {CCLinearLayoutComponent} from '../object-models/components/cc.linear-layout.component';
import {ExtendedModelClass} from '../object-models/model.classes';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container;
  componentRef;
  constructor(private resolver: ComponentFactoryResolver, public componentsStorageService: ComponentsStorageService) {
    // componentsStorageService.root = new CCLinearLayoutComponent(null, 0);

    // console.log(componentsStorageService.root);

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(this.componentsStorageService.root.type);
    this.componentsStorageService.root.componentRef = this.container.createComponent(factory);
    this.componentsStorageService.root.componentRef.instance.component = this.componentsStorageService.root;
  }

  @HostListener('document:pointerup') onPointerUp() {
    this.componentsStorageService.onPointerUp();
  }
}

