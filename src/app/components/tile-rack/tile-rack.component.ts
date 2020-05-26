import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { LetterTileInsertionPointDirective } from 'src/app/directives/letter-tile-insertion-point.directive';

@Component({
  selector: 'sk-tile-rack',
  templateUrl: './tile-rack.component.html',
  styleUrls: ['./tile-rack.component.scss']
})
export class TileRackComponent implements AfterViewInit, OnInit {

  @Input() letters: string[];

  @ViewChildren(LetterTileInsertionPointDirective) insertionPoints: QueryList<LetterTileInsertionPointDirective>;

  private letterTileFactory = this.componentFactoryResolver.resolveComponentFactory(LetterTileComponent);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.letters.forEach((letter, i) => {
      const newComponent = this.insertionPoints.find((item, index) => index === i).viewContainerRef.createComponent(this.letterTileFactory);
      newComponent.instance.letter = letter;
      newComponent.instance.viewRef = newComponent.hostView;
    });
  }

}
