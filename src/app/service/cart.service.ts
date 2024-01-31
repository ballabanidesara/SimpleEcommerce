import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(
    private db: AngularFireDatabase
  ) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }


  addtoCart(product) {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      this.db.list('/shoppingcart').push({
        dateCreated: new Date().getTime()
      })

    }

    // Rest of your code...
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
