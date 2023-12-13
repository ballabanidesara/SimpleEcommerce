import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  images: any[];

  constructor() {
    // this.images = [
    //   { source: 'https://blog.shift4shop.com/hubfs/iStock-1051616786.jpg', alt: 'Image 1' },
    //   { source: 'https://www.sme-news.co.uk/wp-content/uploads/2021/05/ecommerce-growth.jpg', alt: 'Image 2' },
    //   { source: 'https://pagar.me/static/5390a38939014c7fe9a0a4e16c66a246/2f1b1/2021-04-08-seguranca-no-ecommerce.jpg', alt: 'Image 3' }
    // ];
  }

  ngOnInit(): void {
  }

}
