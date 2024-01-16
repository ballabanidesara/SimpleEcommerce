import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productservice';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public selectedProduct: Product | undefined;

  constructor(private productService: ProductService, private route: ActivatedRoute, private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productService.getProductById(productId).subscribe((result) => {
      this.selectedProduct = result;
    });
  }
}