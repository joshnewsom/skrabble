import { environment as env } from 'src/environments/environment';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from 'src/app/services/user/user.service';

import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';

import { GameState } from 'src/app/classes/game-state';
import { User } from 'src/app/classes/user';


@Component({
  selector: 'sk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public games?: GameState[];
  public user?: User;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;

    if (this.user) {

      this.http.get(`${env.apiRoute}/game?uid=${this.user.id}`)
        .subscribe((res: { games: GameState[] }) => {
          this.games = res.games;
          console.log('this.games:', this.games);
        });

    } else {

      const loginDialogRef = this.dialog.open(LoginDialogComponent);
      loginDialogRef.afterClosed().subscribe((token: string) => {
        const payload = token.split('.')[1];

        this.userService.storeToken(token);
        this.userService.setUserFromToken(token);

        // const user = new User(username);
        // this.userService.setUser(user);
        // this.user = user;
      });
      // loginDialogRef.afterClosed().subscribe((username: string) => {
      //   const user = new User(username);
      //   this.userService.setUser(user);
      //   this.user = user;
      // });

    }
  }

  newGame() {
    this.http.post(`${env.apiRoute}/game`, { host: this.user })
      .subscribe((res: { game: GameState }) => {
        const gameId = res.game.gameId;
        this.router.navigate(['game', gameId]);
      });
  }

}
