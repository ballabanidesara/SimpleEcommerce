// user.service.ts

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { signUp, login } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invaliduserAuth = new EventEmitter<boolean>(false);
  private baseUrl = 'https://verdant-fox-a64f52.netlify.app/';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  userSignUp(user: signUp) {
    this.http.post(`${this.baseUrl}/users`, user, { observe: 'response' }).subscribe((result) => {
      console.warn(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }

  userLogin(data: login) {
    this.http.get<signUp[]>(`${this.baseUrl}/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/'])
        } else {
          this.invaliduserAuth.emit(true)
        }
      })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }
}
