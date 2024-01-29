import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { combineLatest, map, pipe, merge, Observable } from 'rxjs';
import { CategoryService } from './service/category.service';

import { zip } from 'rxjs';
import { Product } from './product';

@Injectable()
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService) { }


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

  // postsWithCategory$ = combineLatest([
  //   this.posts$,
  //   this.categoryService.categories$,
  // ]).pipe(
  //   map(([posts]) => {
  //     return posts.map((post) => {
  //       return {
  //         ...post
  //       } as Product;
  //     });
  //   }),

  // );

  // allPosts$ = merge(
  //   this.postsWithCategory$,

  // )


  getAllProducts() {
    return this.http.get<any>('https://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // New method to get a product by ID
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
