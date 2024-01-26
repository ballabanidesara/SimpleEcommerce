import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/productservice';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartService } from 'src/app/service/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

enum MenuType {
  Default = 'default',
  User = 'user',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchTerm !: string;
  userName: string = "";
  searchResult: undefined | Product[];
  cartItems = 0;
  menuType: MenuType = MenuType.Default;
  currentLanguage: string;
  constructor(private authService: AuthenticationService, private route: Router, private product: ProductService,
    private cartService: CartService, private translate: TranslateService) {
    this.currentLanguage = translate.currentLang?.toUpperCase();
  }



  private extractUsername(email: string | null): string {
    if (email) {
      const atIndex = email.indexOf('@'); // Get the index of '@' in the email
      return atIndex !== -1 ? email.substring(0, atIndex) : '';
    }
    return '';
  }


  ngOnInit(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authService.auth.user.subscribe((user) => {
          if (user) {
            this.userName = this.extractUsername(user.email);
            this.menuType = MenuType.User;
          } else {
            this.menuType = MenuType.Default;
            this.userName = '';
          }
        });
      }
    });

    const defaultLanguage = 'en';
    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(defaultLanguage);
    this.currentLanguage = this.getLanguageWithFlag(defaultLanguage);
  }


  userLogout(): void {
    this.authService.auth.signOut().then(() => {
      this.route.navigate(['/user-auth']);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }


  public get cartLength(): number {
    let cartLength = this.cartService.cartItemList.reduce(
      (sum, r) => (sum += r.quantity),
      0
    );

    if (cartLength > 99) {
      cartLength = 99;
    }
    return cartLength;
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = this.getLanguageWithFlag(language);
  }

  private getLanguageWithFlag(language: string): string {
    const flagMap = {
      'en': '🇬🇧',
      'it': '🇮🇹',
    };

    return `${flagMap[language]} ${language.toUpperCase()}`;
  }


}
