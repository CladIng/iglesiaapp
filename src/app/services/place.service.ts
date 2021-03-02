import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

import { Place } from '../models/place.model';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private showEditReservation$ = new Subject<Data>();

  constructor(private firestore: AngularFirestore) { }

  // Mostrar u ocultar crear ceremony
  emmiterShowEditPlace(val: Data): void {
    this.showEditReservation$.next(val);
  }

  getSubjetShowEditPlace(): Subject<Data> {
    return this.showEditReservation$;
  }

  createReservation(ceremonyId: string, place: Place) {
    var key = place.id;
    delete place.id;
    return this.firestore.doc(
      `ceremonies/${ceremonyId}/places/${key}`
    ).update(place);
  }

}
