import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';

import { MatIconRegistry } from '@angular/material/icon';

import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/app/classes/user';


@Component({
  selector: 'sk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public user: User;

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private userService: UserService
  ) {
    const trust = this.domSanitizer.bypassSecurityTrustResourceUrl;
    const registerIcon = (name: string, url: string) => {
      this.matIconRegistry.addSvgIcon(name, trust(url));
    };

    registerIcon('playarrow', 'assets/play_arrow.svg');
  }

  ngOnInit() {
    this.user = this.userService.user;
  }
}
