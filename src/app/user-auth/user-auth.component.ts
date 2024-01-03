import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;
  authError: string = '';
  showLogin: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp() {
    if (this.form.valid) {
      this.authenticationService.signUp(
        this.form.value.email,
        this.form.value.password
      ).subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: (error: any) => {
          this.authError = error.message;
        }
      });
    }
  }

  login() {
    if (this.form.valid) {
      this.isLoggingIn = true;
      this.authenticationService.signIn(
        this.form.value.email,
        this.form.value.password,
      ).subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: (error: any) => {
          this.isLoggingIn = false;
          if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            this.authError = 'Invalid email or password. Please check your credentials.';
          } else {
            this.authError = error.message;
          }
        }
      });
    }
  }


  openSignUp() {
    this.showLogin = false;
    this.initializeForm();
  }

  openLogin() {
    this.showLogin = true;
    this.initializeForm();
  }
}
