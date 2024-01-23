import { Component } from '@angular/core';
import { ProductService } from 'src/app/productservice';
import { Product } from 'src/app/product';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/app/category.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  sortKey: string = '';
  searchKey: string = "";
  quantity: number = 1;
  public products: any;
  sortOptions: SelectItem[];
  categorysortOptions: SelectItem[];
  categories: any[] = [];
  sortOrder: number;
  sortField: string;
  selectedCategoryId = '';
  products$ = this.productService.products$;
  categories$ = this.categoryService.categories$
  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();
  loading: boolean = true;


  filteredProducts$ = combineLatest([
    this.products$,
    this.selectedCategoryAction$,
  ]).pipe(
    map(([products, selectedCategory]) => {
      return products.filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      );
    })

  );

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap) => {
      const selectedCategory = paramMap.get('category');
      this.selectedCategorySubject.next(selectedCategory || '');
    });

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
    this.loadProducts();
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

  loadProducts() {
    this.loading = true;

    this.productService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
        this.products.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        });
        this.loading = false;
      },
      (error) => {
        console.error('Error loading products', error);
        this.loading = false;
      }
    );
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

  onCategoryChange(event: Event): void {
    const selectedCategoryId = (event.target as HTMLSelectElement).value;
    console.log('Selected Category ID:', selectedCategoryId);
    this.selectedCategorySubject.next(selectedCategoryId);

    if (selectedCategoryId) {
      this.router.navigate(['/products', selectedCategoryId.toLowerCase()]);
    } else {
      this.router.navigate(['/products']);
    }
  }

}
