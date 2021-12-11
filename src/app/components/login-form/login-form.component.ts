import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  isAccountCreated = false;
  isLogin = false;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(public dialog: MatDialog, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  async onCreateAccountClicked(e: Event) {
    e.preventDefault();
    this.isAccountCreated = await this.authenticationService.createAccount(this.email.value, this.password.value);
  }

  async onLoginClicked() {
    this.isLogin = await this.authenticationService.login(this.email.value, this.password.value);
  }

}
