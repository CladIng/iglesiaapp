import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

// Services
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {

  listSubcriptions: Subscription[] = [];

  showLoader: boolean = false;

  constructor(
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.listenerShowCard();
  }

  closeNotification(): void {
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }

  listenerShowCard(): void {
    this.listSubcriptions.push(
      this._sharedService.getSubjetLoader().asObservable().subscribe(
        (data: boolean) => this.showLoader = data
      )
    );
  }

}
