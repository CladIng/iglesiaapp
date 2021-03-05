import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

// Models
import { Data } from 'src/app/models/data.model';
import { Place } from 'src/app/models/place.model';

// Services
import { CeremonyService } from "src/app/services/ceremony.service";
import { PlaceService } from "src/app/services/place.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.sass']
})
export class EditReservationComponent implements OnInit {

  listSubcriptions: Subscription[] = [];

  showCard: boolean = false;
  ceremonyId: string = '';
  place: Place;

  name = new FormControl('');
  age = new FormControl('');
  tel = new FormControl('');
  temperature = new FormControl('');

  constructor(
    private _sharedService: SharedService,
    private _placeService: PlaceService
  ) { }

  ngOnInit(): void {
    this.listenerShowCard();
  }

  ngOnDestroy(): void {
    this.listSubcriptions.forEach((sub: Subscription) => { if (sub) sub.unsubscribe(); });
  }

  fillData(place: Place): void {
    this.name.setValue(place.namePerson);
    this.age.setValue(place.agePerson);
    this.tel.setValue(place.telPerson);
    this.temperature.setValue(place.temperaturePerson);
  }

  changeReservation(): void {
    this.place.selected = !this.place.selected;
  }

  createReservation(): void {
    this._sharedService.emmiterLoader(true);
    this.place.namePerson = this.name.value;
    this.place.telPerson = Number(this.tel.value);
    this.place.agePerson = Number(this.age.value);
    this.place.temperaturePerson = Number(this.temperature.value);
    this._placeService.createReservation(this.ceremonyId, this.place)
      .then(e => {
        this._sharedService.emmiterLoader(false);
        this._sharedService.emmiterNotification({type: 1, message: 'Reservación actualizada'});
        new Audio('/assets/audios/audio.mp3').play()
        this.closeCard();
      });
  }

  closeCard(): void {
    this.clearData();
    this._placeService.emmiterShowEditPlace({
      action: false,
      data: null
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
      this._placeService.getSubjetShowEditPlace().asObservable().subscribe(
        (data: Data) => {
          this.showCard = data.action;
          if (data.action) {
            this.place = data.data.place;
            this.fillData(data.data.place);
            this.ceremonyId = data.data.ceremonyId;
          }
        }
      )
    );
  }

}
