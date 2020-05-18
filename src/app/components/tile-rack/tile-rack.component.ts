import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sk-tile-rack',
  templateUrl: './tile-rack.component.html',
  styleUrls: ['./tile-rack.component.scss']
})
export class TileRackComponent implements OnInit {

  @Input() letters: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
