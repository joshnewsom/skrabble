import { environment as env } from 'src/environments/environment';

import {
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { TileDropZoneDirective } from 'src/app/directives/tile-drop-zone.directive';


@Component({
  selector: 'sk-tile-rack',
  templateUrl: './tile-rack.component.html',
  styleUrls: ['./tile-rack.component.scss']
})
export class TileRackComponent {

  // @Input() letters: string[];

  @ViewChildren(TileDropZoneDirective) dropZones: QueryList<TileDropZoneDirective>;

  private letterTileFactory = this.componentFactoryResolver.resolveComponentFactory(LetterTileComponent);
  public tiles: LetterTileComponent[] = [ ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient
  ) { }

  // ngAfterViewInit() {
    // this.letters.forEach(letter => this.createTile(letter));
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.letters && !changes.letters.firstChange) {
  //     changes.letters.currentValue.forEach((letter: string) => this.createTile(letter));
  //   }
  // }


  createTile(letter: string) {
    const zone = this.dropZones.find(zone => !zone.tile);
    if (zone !== undefined) {
      const newComponent = zone.insertionPoint.createComponent(this.letterTileFactory);
      newComponent.instance.letter = letter;
      newComponent.instance.viewRef = newComponent.hostView;
      zone.tile = newComponent.instance;
      this.tiles.push(newComponent.instance);
    } else {
      console.log('Not enough space on rack!')
    }
  }


  onPickUpTile(letterTile: LetterTileComponent) {
    const index = this.tiles.indexOf(letterTile);
    if (index >= 0) {
      this.tiles.splice(index, 1);
    }
  }


  onDropTile(letterTile: LetterTileComponent) {
    this.tiles.push(letterTile);
  }

}
