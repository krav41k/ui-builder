import {Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {TreeControlService} from '../services/tree-control.service';
import {ComponentsStorageService} from '../services/components-storage.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[cdSortable]'
})
export class CDSortableDirective extends DraggableDirective implements OnInit, OnDestroy {

  @Input() sortableComponent;

  subscriptions: Subscription[] = [];

  constructor(
    public el: ElementRef,
    private treeControlService: TreeControlService,
    private renderer: Renderer2,
    private componentsSS: ComponentsStorageService
  ) {
    super();
    this.subscriptions.push(this.dragStart.subscribe(() => {
      treeControlService.changeSelectedItem(el);
      this.componentsSS.selectComponent(this.sortableComponent);
    }));
  }

  ngOnInit(): void {
    this.addPadding();
    this.treeControlService.newTreeItem(this, this.sortableComponent);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.treeControlService.removeTreeItem(this, this.sortableComponent);
  }

  public addPadding() {
    this.renderer.setStyle(this.el.nativeElement, 'paddingLeft', `${this.sortableComponent.level * 10}px`);
  }
}
