import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterTileComponent } from './components/letter-tile/letter-tile.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { SquareComponent } from './components/square/square.component';
import { TileRackComponent } from './components/tile-rack/tile-rack.component';
import { GameComponent } from './components/game/game.component';
import { TileDropZoneDirective } from './directives/tile-drop-zone.directive';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { BlankTileDialogComponent } from './components/blank-tile-dialog/blank-tile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterTileComponent,
    GameBoardComponent,
    SquareComponent,
    TileRackComponent,
    GameComponent,
    TileDropZoneDirective,
    HomeComponent,
    JoinGameComponent,
    LoginDialogComponent,
    PlayerListComponent,
    BlankTileDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
