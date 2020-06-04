import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { TileDropZoneDirective } from 'src/app/directives/tile-drop-zone.directive';

import { LetterSack } from 'src/app/classes/letter-sack';

@Component({
  selector: 'sk-tile-rack',
  templateUrl: './tile-rack.component.html',
  styleUrls: ['./tile-rack.component.scss']
})
export class TileRackComponent implements AfterViewInit {

  @Input() letterSack: LetterSack;

  @ViewChildren(TileDropZoneDirective) dropZones: QueryList<TileDropZoneDirective>;

  private letterTileFactory = this.componentFactoryResolver.resolveComponentFactory(LetterTileComponent);
  public tiles: LetterTileComponent[] = [ ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    const letters = this.letterSack.draw(7);

    const dropZones = this.dropZones.toArray();
    letters.forEach((letter, i) => {
      const newComponent = dropZones[i].insertionPoint.createComponent(this.letterTileFactory);
      newComponent.instance.letter = letter;
      newComponent.instance.viewRef = newComponent.hostView;
      dropZones[i].tile = newComponent.instance;

      this.tiles.push(newComponent.instance);
    });
  }

  onPickUpTile(letterTile: LetterTileComponent) {
    let index = this.tiles.indexOf(letterTile);
    if (index >= 0) {
      this.tiles.splice(index, 1);
    }
  }

  onDropTile(letterTile: LetterTileComponent) {
    this.tiles.push(letterTile);
  }

}
