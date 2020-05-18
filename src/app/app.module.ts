import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterTileComponent } from './components/letter-tile/letter-tile.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { SquareComponent } from './components/square/square.component';
import { TileRackComponent } from './components/tile-rack/tile-rack.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterTileComponent,
    GameBoardComponent,
    SquareComponent,
    TileRackComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
