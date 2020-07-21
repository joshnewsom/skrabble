import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from 'src/app/components/game/game.component';
import { HomeComponent } from 'src/app/components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'game/:id', component: GameComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
