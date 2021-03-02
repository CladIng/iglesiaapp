import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

// Services
import { CeremonyService } from "src/app/services/ceremony.service";

// Models
import { Place } from "src/app/models/place.model";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit {

  ceremonyId: string = '';

  places: Place[] = [];

  availables: number = 0;

  constructor(
    private _ceremonyService: CeremonyService,
    private _rutaActiva: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readParameters();
  }

  readParameters(): void {
    if (this._rutaActiva.snapshot.params.id) {
      this.ceremonyId = this._rutaActiva.snapshot.params.id;
      this.getPlaces();
    }
  }

  getPlaces(): void {
    this._ceremonyService.getPlacesOfCeremonies(this.ceremonyId).subscribe(data => {
      this.availables = 0;
      this.places = data.map(e => {
        const data = e.payload.doc.data() as Object
        !data['selected'] ? this.availables++ : this.availables;
        return {
          id: e.payload.doc.id,
          ...data
        } as Place;
      });
    });
  }
  
  openReservation(place: Place): void {
    this._ceremonyService.emmiterShowCreateReservation({
      action: true,
      data: {
        place: place,
        ceremonyId: this.ceremonyId
      }
    });
  }

}
