import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

// Models
import { Data } from 'src/app/models/data.model';
import { Ceremony } from 'src/app/models/ceremony.model';

// Services
import { CeremonyService } from "src/app/services/ceremony.service";
import { PlaceService } from "src/app/services/place.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: 'app-edit-ceremony',
  templateUrl: './edit-ceremony.component.html',
  styleUrls: ['./edit-ceremony.component.sass']
})
export class EditCeremonyComponent implements OnInit {

  listSubcriptions: Subscription[] = [];

  showCard: boolean = false;

  name = new FormControl('');
  date = new FormControl('');

  tryDeleteOption: boolean = false;

  ceremony: Ceremony = null;

  constructor(
    private _ceremonyService: CeremonyService,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.listenerShowCard();
  }

  ngOnDestroy(): void {
    this.listSubcriptions.forEach((sub: Subscription) => { if (sub) sub.unsubscribe(); });
  }

  tyrDelete(): void {
    this.tryDeleteOption = true;
  }
  
  cancelTryDelete(): void {
    this.tryDeleteOption = false;
  }
  
  deleteCeremony(): void {
    this._sharedService.emmiterLoader(true);
    this._ceremonyService.deleteCeremony(this.ceremony).then((e: any) => {
      this._sharedService.emmiterLoader(false);
      this._sharedService.emmiterNotification({ type: 1, message: 'Eliminado correctameente' });
      this.closeCard();
    }).catch((e: any) => {
      this._sharedService.emmiterLoader(false);
      this._sharedService.emmiterNotification({ type: 3, message: 'Algo salió mal' });
    })
  }

  updateCeremony(): void {
    this._sharedService.emmiterLoader(true);
    this.ceremony.name = this.name.value;
    this.ceremony.date = this.date.value;
    this._ceremonyService.updateCeremony(this.ceremony).then((e: any) => {
      this._sharedService.emmiterLoader(false);
      this._sharedService.emmiterNotification({ type: 1, message: 'Actualización correcta' });
      this.closeCard();
    }).catch((e: any) => {
      this._sharedService.emmiterLoader(false);
      this._sharedService.emmiterNotification({ type: 3, message: 'Algo salió mal' });
    })
  }

  closeCard(): void {
    this.clearData();
    this._ceremonyService.emmiterShowEditCeremony({
      action: false,
      data: null
    });
  }

  clearData(): void {
    this.ceremony = null;
    this.name.setValue('');
    this.date.setValue('');
  }

  fillData(ceremony: Ceremony): void {
    this.name.setValue(ceremony.name);
    this.date.setValue(ceremony.date);
  }

  listenerShowCard(): void {
    this.listSubcriptions.push(
      this._ceremonyService.getSubjetShowEditCeremony().asObservable().subscribe(
        (data: Data) => {
          this.showCard = data.action;
          if (data.action) {
            this.ceremony = data.data;
            this.fillData(data.data);
          }
        }
      )
    );
  }

}
