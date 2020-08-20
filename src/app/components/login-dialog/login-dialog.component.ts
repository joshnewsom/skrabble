import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sk-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  public isNewUser: boolean = false;
  public password: string;
  public passwordConfirm: string;
  public username: string;


  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private http: HttpClient
  ) { }


  login() {
    const { username, password } = this;
    this.http.post(`localhost:1328/login`, { username, password })
      .subscribe(res => {
        console.log('res:', res);
      });
  }


  newUser() {
    const { username, password } = this;
    this.http.post(`http://localhost:1328`, { username, password })
      .subscribe(res => {
        console.log('res:', res);
      });
  }


  submit() {
    const { username, password } = this;
    const host = 'http://localhost:1328';

    const route = `${host}${!this.isNewUser ? '/login' : ''}`;

    this.http.post(route, { username, password })
      .subscribe(
        (res: { token: string }) => {
          console.log('res:', res);
          const { token } = res;
          console.log('token:', token);
          this.dialogRef.close(token);
        },
        (err => {
          console.error(err);
        })
      )
  }

}
