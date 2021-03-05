import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  listSubcriptions: Subscription[] = [];

  type: number;
  message: string;

  showNotification: boolean = false;

  constructor(
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.listenerShowCard();
  }

  ngOnDestroy(): void {
    this.listSubcriptions.forEach((sub: Subscription) => { if (sub) sub.unsubscribe(); });
  }

  closeNotification(): void {
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  listenerShowCard(): void {
    this.listSubcriptions.push(
      this._sharedService.getSubjetNotification().asObservable().subscribe(
        (data: {type: number, message: string}) => {
          this.type = data.type;
          this.message = data.message;
          this.showNotification = true;
          this.closeNotification();
        }
      )
    );
  }

}
