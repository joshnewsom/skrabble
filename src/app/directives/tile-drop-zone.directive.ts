import {
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef
} from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { DragService } from 'src/app/services/drag/drag.service';

import { DropEvent } from 'src/app/services/drag/drop-event.interface';

@Directive({
  selector: '[skTileDropZone]'
})
export class TileDropZoneDirective implements OnInit {

  @ContentChild('insertionPoint', { read: ViewContainerRef }) insertionPoint: ViewContainerRef;

  @Input() blocked?: boolean;

  @Output() dropTile = new EventEmitter<LetterTileComponent>();
  @Output() pickUpTile = new EventEmitter<LetterTileComponent>();

  public tile?: LetterTileComponent;

  constructor(
    private dragService: DragService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    // subscribe to drop events
    this.dragService.onDropTile.subscribe((event: DropEvent) => {
      const { element, letterTile } = event;

      if (this.elementRef.nativeElement === element && !this.blocked) {
        this.insert(letterTile);
        this.dropTile.emit(letterTile);
      }
    });

    // subscribe to pick up events
    this.dragService.onPickUpTile.subscribe((letterTile: LetterTileComponent) => {
      if (letterTile === this.tile && !this.blocked) {
        this.pickUpTile.emit(letterTile);
        this.tile = undefined;
      }
    });
  }

  insert(letterTile: LetterTileComponent) {
    this.insertionPoint.insert(letterTile.viewRef);
    this.tile = letterTile;
  }
}
