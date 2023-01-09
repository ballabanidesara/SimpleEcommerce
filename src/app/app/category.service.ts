import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories$ =
  this.http.get('https://fakestoreapi.com/products/categories')
   

  constructor(private http: HttpClient) { }
}
