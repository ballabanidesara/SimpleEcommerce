import { Component } from '@angular/core';
import { ProductService } from 'src/app/productservice';
import { Product } from 'src/app/product';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/app/category.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  searchKey: string = "";
  quantity: number = 1;
  public products: any;
  sortOptions: SelectItem[];
  categorysortOptions: SelectItem[];
  categories: any[] = [];
  sortOrder: number;
  sortField: string;




  selectedCategoryId = '';
  posts$ = this.productService.allPosts$;
  categories$ = this.categoryService.categories$

  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();


  filteredPosts$ = combineLatest([
    this.posts$,
    this.selectedCategoryAction$,
    
  ]).pipe(

    map(([posts, selectedCategory]) => {
      return posts.filter((post) =>
        selectedCategory ? post.category === selectedCategory : true
      );
    })
    
  );


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      this.products.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];


    this.categorysortOptions = [
      { label: 'Sort from A-Z', value: 'category' },
      { label: 'Sort from Z-A', value: '!category' },
    ];

    this.primengConfig.ripple = true;
    this.getCategories()
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
    })
  }
  getCategories() {
    this.productService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    })
  }

  filterProductsCategory(event: any) {
    let value = event.target.value;
    if (value == "all") {
      this.getProducts()
    }
    else {
      this.getProductsCategory(value)
    }

  }

  getProductsCategory(keyword: string) {
    this.productService.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res;
      this.products.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });

    })

  }


  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);

  }

  onCategoryChange(event: Event) {
    let selectedCategoryId = (event.target as HTMLSelectElement).value;
    this.selectedCategorySubject.next(selectedCategoryId);
  }


  // filter(category: string) {
  //   this.filterCategory = this.products
  //     .filter((a: any) => {
  //       if (a.category == category || category == '') {
  //         return a;
  //       }
  //     })
  // }
}
