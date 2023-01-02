import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Product } from './product';

@Injectable()
export class ProductService {


  constructor(private http: HttpClient) { }


  getAllProducts() {
    return this.http.get<any>('https://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllCategories(){
    return this.http.get('https://fakestoreapi.com/products/categories')
  }

  getProductsByCategory(keyword: string){
    return this.http.get('https://fakestoreapi.com/products/category/' + keyword)
  }

}
