import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { combineLatest, map, pipe, merge, Observable } from 'rxjs';
import { CategoryService } from './service/category.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { zip } from 'rxjs';
import { Product } from './product';

@Injectable()
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();
  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private categoryService: CategoryService) { }


  // products$ = this.firestore
  //   .collection<Product>('products')
  //   .valueChanges({ idField: 'id' });

  // getAllProducts(): Observable<Product[]> {
  //   return this.products$;
  // }

  // getProductById(productId: string): Observable<Product | undefined> {
  //   return this.firestore
  //     .doc<Product>(`products/${productId}`)
  //     .valueChanges({ idField: 'id' });
  // }

  // getAllCategories() {
  //   return this.firestore.collection('categories').valueChanges();
  // }

  // getProductsByCategory(keyword: string) {
  //   return this.firestore
  //     .collection<Product>('products', ref => ref.where('category', '==', keyword))
  //     .valueChanges({ idField: 'id' });
  // }


  products$ = this.http
    .get<{ [id: string]: Product }>(
      `https://fakestoreapi.com/products`
    )
    .pipe(
      map((products) => {
        let productsData: Product[] = [];
        for (let id in products) {
          productsData.push({ ...products[id], id });
        }
        return productsData;
      }),

    );

  getAllProducts() {
    return this.http.get<any>('https://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getProductById(productId: string): Observable<Product | undefined> {
    return this.products$.pipe(
      map((products: Product[]) => {
        return products.find((product) => product.id === productId);
      })
    );
  }


  getAllCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories')
  }

  getProductsByCategory(keyword: string) {
    return this.http.get('https://fakestoreapi.com/products/category/' + keyword)
  }

}
