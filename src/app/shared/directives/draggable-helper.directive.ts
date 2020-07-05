import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {GlobalPositionStrategy, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {DraggableDirective} from './draggable.directive';

@Directive({
  selector: '[cdDraggableHelper]',
})
export class DraggableHelperDirective implements OnInit, OnDestroy {

  @Input() cdDraggableHelper: any;

  // @Input() set cdDraggableHelperDragStart(emitter: EventEmitter<PointerEvent>) {
  //   this.subList.push(emitter.subscribe(event => this.onDragStart(event)));
  // }
  @Input() set cdDraggableHelperDragMove(emitter: EventEmitter<PointerEvent>) {
    this.subList.push(emitter.subscribe(event => this.onDragMove(event)));
  }
  @Input() set cdDraggableHelperDragEnd(emitter: EventEmitter<PointerEvent>) {
    this.subList.push(emitter.subscribe(() => this.onDragEnd()));
  }

  private  overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private subList: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
  ) {}

  ngOnInit(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => sub.unsubscribe());
    this.overlayRef.dispose();
  }

  // private onDragStart(event: PointerEvent): void {}

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
