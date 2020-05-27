import { Directive, ContentChild, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { LetterTileInsertionPointDirective } from 'src/app/directives/letter-tile-insertion-point.directive';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { DragService } from 'src/app/services/drag/drag.service';

import { DropEvent } from 'src/app/services/drag/drop-event.interface';

@Directive({
  selector: '[skTileDropZone]'
})
export class TileDropZoneDirective implements OnInit {

  @ContentChild(LetterTileInsertionPointDirective) insertionPoint: LetterTileInsertionPointDirective;

  @Output() onDrop? = new EventEmitter<LetterTileComponent>();

  constructor(
    private dragService: DragService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.dragService.onDropTile.subscribe((event: DropEvent) => {
      const { element, letterTile } = event;

      if (this.elementRef.nativeElement === element) {
        this.insertionPoint.viewContainerRef.insert(letterTile.viewRef);

        if (this.onDrop) {
          this.onDrop.emit(letterTile);
        }
      }
    });
  }

}
