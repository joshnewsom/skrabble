import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterTileComponent } from './components/letter-tile/letter-tile.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterTileComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
