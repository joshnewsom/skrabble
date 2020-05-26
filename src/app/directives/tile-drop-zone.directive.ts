import { Directive, ContentChild, ElementRef, OnInit } from '@angular/core';

import { LetterTileInsertionPointDirective } from 'src/app/directives/letter-tile-insertion-point.directive';

import { DragService } from 'src/app/services/drag/drag.service';

@Directive({
  selector: '[skTileDropZone]'
})
export class TileDropZoneDirective implements OnInit {

  @ContentChild(LetterTileInsertionPointDirective) insertionPoint: LetterTileInsertionPointDirective;

  constructor(
    private dragService: DragService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.dragService.onDropTile.subscribe(data => {
      const { element, letterTile } = data;

      if (this.elementRef.nativeElement === element) {
        this.insertionPoint.viewContainerRef.insert(letterTile.viewRef);
      }
    });
  }

}
