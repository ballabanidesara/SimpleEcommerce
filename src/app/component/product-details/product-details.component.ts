import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/productservice';
import { Product } from 'src/app/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
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