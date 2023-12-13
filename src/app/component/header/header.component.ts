import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchTerm !: string;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {

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
