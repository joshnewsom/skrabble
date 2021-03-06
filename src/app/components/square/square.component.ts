import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { PlayerService } from 'src/app/services/player/player.service';

import { BlankTileDialogComponent } from 'src/app/components/blank-tile-dialog/blank-tile-dialog.component';
import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { TileDropZoneDirective } from 'src/app/directives/tile-drop-zone.directive';

@Component({
  selector: 'sk-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() center?: boolean;
  @Input() multiplier?: string;
  @Input() row?: number;
  @Input() column?: number;

  // @Output() onTileAdded = new EventEmitter<LetterTileComponent>();
  // @Output() onTileRemoved = new EventEmitter<LetterTileComponent>();

  @ViewChild(TileDropZoneDirective) public dropZone: TileDropZoneDirective;

  public multiplierClass?: string;
  public textContent?: string;
  public tile?: LetterTileComponent;

  private letterTileFactory = this.componentFactoryResolver.resolveComponentFactory(LetterTileComponent);

  constructor(
    private dialog: MatDialog,
    public playerService: PlayerService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    if (this.multiplier) {
      switch (this.multiplier) {
        case '2L':
          this.multiplierClass = 'double-letter';
          this.textContent = 'Double Letter Score';
          break;
        case '3L':
          this.multiplierClass = 'triple-letter';
          this.textContent = 'Triple Letter Score';
          break;
        case '2W':
          this.multiplierClass = 'double-word';
          if (!this.center) {
            this.textContent = 'Double Word Score';
          }
          break;
        case '3W':
          this.multiplierClass = 'triple-word';
          this.textContent = 'Triple Word Score';
          break;
      }
    }
  }

  insertTile(letter: string) {
    const newComponent = this.dropZone.insertionPoint.createComponent(this.letterTileFactory);
    newComponent.instance.letter = letter;
    newComponent.instance.viewRef = newComponent.hostView;
    this.dropZone.tile = newComponent.instance;
    this.tile = newComponent.instance;
    this.tile.locked = true;
  }

  onDropTile(tile: LetterTileComponent) {
    this.tile = tile;
    if (this.tile.isBlankTile) {
      this.dialog.open(BlankTileDialogComponent)
        .afterClosed()
        .subscribe((dialogResult) => {
          if (dialogResult) {
            this.tile.letter = dialogResult.toUpperCase();
          }
        });
    }
  }

  onPickUpTile(tile: LetterTileComponent) {
    this.tile = undefined;
    if (tile.isBlankTile) {
      tile.letter = '';
    }
  }

}
