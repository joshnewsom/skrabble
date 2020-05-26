import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[skLetterTileInsertionPoint]'
})
export class LetterTileInsertionPointDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
