import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { CeremonyService } from "src/app/services/ceremony.service";
import { PlaceService } from "src/app/services/place.service";

// Models
import { Place } from "src/app/models/place.model";

@Component({
  selector: 'app-places-admin',
  templateUrl: './places-admin.component.html',
  styleUrls: ['./places-admin.component.sass']
})
export class PlacesAdminComponent implements OnInit {

  places: Place[] = [];
  ceremonyId: string = '';
  loading: boolean = false;

  constructor(
    private _ceremonyService: CeremonyService,
    private _placeService: PlaceService,
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
    this.loading = true;
    this._ceremonyService.getPlacesOfCeremonies(this.ceremonyId).subscribe(data => {
      this.places = data.map(e => {
        const data = e.payload.doc.data() as Object
        return {
          id: e.payload.doc.id,
          ...data
        } as Place;
      });
      this.loading = false;
    });
  }

  editReservation(place: Place): void {
    this._placeService.emmiterShowEditPlace({
      action: true,
      data: {
        ceremonyId: this.ceremonyId,
        place: place
      }
    })
  }

}
