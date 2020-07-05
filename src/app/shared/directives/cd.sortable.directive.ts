import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {TreeControlService} from '../services/tree-control.service';

@Directive({
  selector: '[cdSortable]'
})
export class CDSortableDirective extends DraggableDirective implements OnInit {

  @Input() sortableComponent;

  constructor(public element: ElementRef, private treeControlService: TreeControlService, private renderer: Renderer2) {
    super();
    this.dragStart.subscribe(() => {
      treeControlService.changeSelectedItem(element);
    });
  }

  ngOnInit(): void {
    this.addPadding();
    this.treeControlService.newTreeItem(this, this.sortableComponent);
  }

  public addPadding() {
    this.renderer.setStyle(this.element.nativeElement, 'paddingLeft', `${this.sortableComponent.level * 10}px`);
  }
}
