import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../Services/shared-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  sharedDataInfo: any;
  constructor(private sharedDataServices: SharedDataService) {}

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    await this.sharedDataServices
      .getSharedInfos()
      .toPromise()
      .then((res: any) => {
        this.sharedDataInfo = res;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
