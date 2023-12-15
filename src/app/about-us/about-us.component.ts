import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  images: any[];

  constructor() {
    this.images = [
      {
        source: 'https://t3.ftcdn.net/jpg/01/36/25/58/360_F_136255856_XGPHT6zyNJay48Dprr0bTVYb4XlUuSaI.jpg',
        alt: 'Image 1',
        overlayText: '"Our mission is to provide seamless shopping experiences, catering to diverse needs while ensuring customer satisfaction and convenience."'
      },
      {
        source: 'https://t3.ftcdn.net/jpg/01/36/25/58/360_F_136255856_XGPHT6zyNJay48Dprr0bTVYb4XlUuSaI.jpg',
        alt: 'Image 2',
        overlayText: '"Our vision is to become a market leader in delivering innovative products and services, setting new standards for excellence and reliability."'
      },
      {
        source: 'https://t3.ftcdn.net/jpg/01/36/25/58/360_F_136255856_XGPHT6zyNJay48Dprr0bTVYb4XlUuSaI.jpg',
        alt: 'Image 3',
        overlayText: '"At our core, we uphold integrity, transparency, and a customer-centric approach, striving for excellence in every interaction and transaction."'
      }
    ];
  }



  ngOnInit(): void {
  }

}
