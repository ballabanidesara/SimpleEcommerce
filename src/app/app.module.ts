import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProductService } from './productservice';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { ProductsComponent } from './component/products/products.component';
import { HeaderComponent } from './component/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './component/cart/cart.component';
import { FilterPipe } from './shared/filter.pipe';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CarouselModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCkMo7ti4_YfMoBoU7trwPbUtvenyeFjr8",
      authDomain: "simple-e-commerce-3fbe8.firebaseapp.com",
      projectId: "simple-e-commerce-3fbe8",
      storageBucket: "simple-e-commerce-3fbe8.appspot.com",
      messagingSenderId: "549145985742",
      appId: "1:549145985742:web:f7d2a1ccb731ae1ad6469f",
      measurementId: "G-WDJE7HXEBJ"
    }),
    AngularFireAuthModule
  ],
  declarations: [AppComponent, ProductsComponent, HeaderComponent, CartComponent, FilterPipe, UserAuthComponent, ContactUsComponent, AboutUsComponent, HomeComponent],
  bootstrap: [AppComponent],
  providers: [ProductService]
})

export class AppModule { }
