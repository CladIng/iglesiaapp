import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

// Models
import { Data } from 'src/app/models/data.model';
import { Place } from 'src/app/models/place.model';

// Services
import { CeremonyService } from "src/app/services/ceremony.service";
import { PlaceService } from "src/app/services/place.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass']
})
export class ReservationComponent implements OnInit {

  listSubcriptions: Subscription[] = [];

  showCard: boolean = false;
  place: Place;
  ceremonyId: string;

  name = new FormControl('');
  age = new FormControl('');
  tel = new FormControl('');

  constructor(
    private _ceremonyService: CeremonyService,
    private _placeService: PlaceService,
    private _sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.listenerShowCard();
  }

  ngOnDestroy(): void {
    this.listSubcriptions.forEach((sub: Subscription) => { if (sub) sub.unsubscribe(); });
  }

  closeCard(): void {
    this.clearData();
    this._ceremonyService.emmiterShowCreateReservation({
      action: false,
      data: null
    });
  }

  createReservation(): void {
    this.place.namePerson = this.name.value;
    this.place.telPerson = Number(this.tel.value);
    this.place.agePerson = Number(this.age.value);
    this.place.selected = true;
    this._placeService.createReservation(this.ceremonyId, this.place)
      .then(e => {
        this._sharedService.emmiterNotification({type: 1, message: 'Reservación creada'});
        new Audio('/assets/audios/audio.mp3').play()
        this.closeCard();
      });
  }

  clearData(): void {
    this.place = null;
    this.ceremonyId = '';
    this.name.setValue('');
    this.tel.setValue('');
    this.age.setValue('');
  }

  listenerShowCard(): void {
    this.listSubcriptions.push(
      this._ceremonyService.getSubjetShowCreateReservation().asObservable().subscribe(
        (data: Data) => {
          this.showCard = data.action;
          if (data.action) {
            this.place = data.data.place;
            this.ceremonyId = data.data.ceremonyId;
          }
        }
      )
    );
  }

}
