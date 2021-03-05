import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

// Services
import { CeremonyService } from "src/app/services/ceremony.service";
import { SharedService } from "src/app/services/shared.service";

// Models
import { Place } from "src/app/models/place.model";

@Component({
  selector: 'app-create-cereminy',
  templateUrl: './create-cereminy.component.html',
  styleUrls: ['./create-cereminy.component.sass']
})
export class CreateCereminyComponent implements OnInit {

  listSubcriptions: Subscription[] = [];

  showCard: boolean = false

  name = new FormControl('');
  date = new FormControl('');
  placesNumber = new FormControl(0);

  constructor(
    private _ceremonyService: CeremonyService,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.listenerShowCard()
  }

  ngOnDestroy(): void {
    this.listSubcriptions.forEach((sub: Subscription) => { if (sub) sub.unsubscribe(); });
  }

  createCereminy(): void {
    this._sharedService.emmiterLoader(true);
    this._ceremonyService.createCeremony({
      key: '',
      name: this.name.value,
      date: this.date.value,
      places: []
    }).then((e: any) => {
      this.generatePlaces(e.id);
      this.closeCard();
    });
  }

  generatePlaces(ceremonyKey: string): Place[] {
    let places: Place[] = [];
    for (let i = 1; i <= this.placesNumber.value; i++) {
      this._ceremonyService.createPlaceOfCeremony(ceremonyKey, {
        id: '',
        position: i,
        selectionDate: this.date.value,
        namePerson: '',
        idPerson: 0,
        telPerson: 0,
        agePerson: 0,
        temperaturePerson: 0,
        selected: false,
      });
    }
    this._sharedService.emmiterNotification({type: 1, message: 'Creado correctamente'})
    this._sharedService.emmiterLoader(false);
    return places;
  }

  closeCard(): void {
    this._ceremonyService.emmiterShowCreateCeremony(false);
  }

  listenerShowCard(): void {
    this.listSubcriptions.push(
      this._ceremonyService.getSubjetShowCreateCeremony().asObservable().subscribe(
        data => this.showCard = data
      )
    );
  }

}
