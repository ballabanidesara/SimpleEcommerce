import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/productservice';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchTerm !: string;
  menuType: string = 'default';
  userName: string = "";
  searchResult: undefined | Product[];
  cartItems = 0;
  constructor(private route: Router, private product: ProductService, private cartService: CartService) { }



  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {

      if (localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName = userData.name;
        this.menuType = 'user';

      }
      else {
        this.menuType = 'default';
      }
    })
  }


  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }


  public get cartLength(): number {
    let cartLength = this.cartService.cartItemList.reduce(
      (sum, r) => (sum += r.quantity),
      0
    );

    if (cartLength > 99) {
      cartLength = 99;
    }
    return cartLength;
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }


}
