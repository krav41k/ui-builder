import {Directive, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {GlobalPositionStrategy, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {DraggableDirective} from './draggable.directive';

@Directive({
  selector: '[cdDraggableHelper]',
  exportAs: 'cdDraggableHelper'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {

  private  overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition?: { x: number; y: number};
  private subList: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private draggableDirective: DraggableDirective,
    private overlay: Overlay) {}

  ngOnInit(): void {
    this.subList.push(this.draggableDirective.dragStart.subscribe(event => this.onDragStart(event)));
    this.subList.push(this.draggableDirective.dragMove.subscribe(event => this.onDragMove(event)));
    this.subList.push(this.draggableDirective.dragEnd.subscribe(() => this.onDragEnd()));
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => sub.unsubscribe());
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent): void {
    // const clientRect = this.draggableDirective.element.nativeElement.getBoundingClientRect();
    // console.log(clientRect);
    // this.startPosition = {
    //   x: event.clientX,
    //   y: event.clientY
    // };
  }

  private onDragMove(event: PointerEvent): void {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));

    }
    this.positionStrategy.left(`${event.clientX}px`);
    this.positionStrategy.top(`${event.clientY}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    this.overlayRef.detach();
  }
}
