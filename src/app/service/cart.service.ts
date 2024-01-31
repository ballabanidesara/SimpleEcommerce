import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  constructor() {
    this.loadCartFromLocalStorage();
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  productList$ = this.productList.asObservable();

  addtoCart(product: any): void {
    const productExistInCart = this.cartItemList.find(({ title }) => title === product.title);
    if (!productExistInCart) {
      product.quantity = 1;
      this.cartItemList.push(product);
    } else if (typeof productExistInCart.quantity === 'number') {
      productExistInCart.quantity += 1;
    } else {
      productExistInCart.quantity = 1;
    }

    console.log('Cart before update:', this.cartItemList); // Log the cart before the update
    this.productList.next(this.cartItemList);
    this.saveCartToLocalStorage(); // Save the updated cart to local storage
    console.log('Cart after update:', this.cartItemList); // Log the cart after the update
    this.getTotalPrice();
  }

  private saveCartToLocalStorage(): void {
    // Save the cart data to local storage
    localStorage.setItem('cartItemList', JSON.stringify(this.cartItemList));
  }

  private loadCartFromLocalStorage(): void {
    // Load the cart data from local storage during service initialization
    const savedCart = localStorage.getItem('cartItemList');
    if (savedCart) {
      this.cartItemList = JSON.parse(savedCart);
      this.productList.next(this.cartItemList);
    }
  }


  // addtoCart(product: any) {
  //   const productExistInCart = this.cartItemList.find(({ title }) => title === product.title);

  //   if (!productExistInCart) {
  //     product.quantity = 1;
  //     this.cartItemList.push(product);
  //     this.productList.next(this.cartItemList);
  //     this.getTotalPrice();
  //     return;
  //   }
  //   if (typeof productExistInCart.quantity === 'number') {
  //     productExistInCart.quantity += 1;
  //   } else {
  //     productExistInCart.quantity = 1;
  //   }
  //   this.productList.next(this.cartItemList);
  //   this.getTotalPrice();
  // }


  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.quantity * a.price
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

}
