import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {GlobalPositionStrategy, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {CDViewDraggableDirective} from './cd.view-draggable.directive';

@Directive({
  selector: '[cdDraggableHelper]',
  exportAs: 'cdDraggableHelper'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {

  private  overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition?: { x: number; y: number};
  private subList: Subscription[] = [];

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private viewDraggableDirective: CDViewDraggableDirective,
              private overlay: Overlay) {}

  ngOnInit(): void {
    this.subList.push(this.viewDraggableDirective.dragStart.subscribe(event => this.onDragStart(event)));
    this.subList.push(this.viewDraggableDirective.dragMove.subscribe(event => this.onDragMove(event)));
    this.subList.push(this.viewDraggableDirective.dragEnd.subscribe(() => this.onDragEnd()));
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => sub.unsubscribe());
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent): void {
    const clientRect = this.viewDraggableDirective.element.nativeElement.getBoundingClientRect();
    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top
    };
  }

  private onDragMove(event: PointerEvent): void {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }

    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    this.viewContainerRef.clear();
    this.overlayRef.detach();
  }
}
