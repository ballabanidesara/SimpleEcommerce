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
        source: 'https://i.pinimg.com/736x/16/c0/00/16c000e61419c831af24d2e85ec9b3c8.jpg',
        alt: 'Image 1',
        overlayText: '"Our mission is to provide seamless shopping experiences, catering to diverse needs while ensuring customer satisfaction and convenience."'
      },
      {
        source: 'https://i.pinimg.com/564x/29/b0/1e/29b01e5fa43840955c7153e6ca99ae2c.jpg',
        alt: 'Image 2',
        overlayText: '"Our vision is to become a market leader in delivering innovative products and services, setting new standards for excellence and reliability."'
      },
      {
        source: 'https://i.pinimg.com/564x/29/b0/1e/29b01e5fa43840955c7153e6ca99ae2c.jpg',
        alt: 'Image 3',
        overlayText: '"At our core, we uphold integrity, transparency, and a customer-centric approach, striving for excellence in every interaction and transaction."'
      }
    ];
  }



  ngOnInit(): void {
  }
}
