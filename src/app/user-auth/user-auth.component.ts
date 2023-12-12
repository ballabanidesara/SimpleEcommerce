import { Component, OnInit } from '@angular/core';
import { signUp, login } from '../data-type';
import { UserService } from '../user.service';
import { ProductService } from '../productservice';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  constructor(private user: UserService, private product: ProductService) { }
  showLogin: boolean = true;
  authError: string = "";


  ngOnInit(): void {

  }

  signUp(data: signUp) {
    console.warn(data)
  }

  login(data: login) {
    this.user.userLogin(data)
    this.user.invaliduserAuth.subscribe((result) => {
      console.warn("apple", result)
      if (result) {
        this.authError = "User not found"
      }

    })
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

}
