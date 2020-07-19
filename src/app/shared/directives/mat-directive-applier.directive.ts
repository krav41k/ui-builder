import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[cdDirectiveApplier]'
})
export class MatDirectiveApplierDirective {

  @HostBinding('attr.ng-reflect-disabled') matBadgeDisabled = true;
}
