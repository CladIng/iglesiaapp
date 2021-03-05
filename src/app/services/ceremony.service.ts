import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

// Models
import { Ceremony } from 'src/app/models/ceremony.model';
import { Place } from '../models/place.model';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class CeremonyService {

  // Objetos Observable y Emiters
  private showCreateCeremony$ = new Subject<boolean>();

  private showEditCeremony$ = new Subject<Data>();
  
  private showCreateReservation$ = new Subject<Data>();

  constructor(private firestore: AngularFirestore) { }

  // Mostrar u ocultar crear ceremony
  emmiterShowCreateCeremony(val: boolean): void {
    this.showCreateCeremony$.next(val);
  }

  getSubjetShowCreateCeremony(): Subject<boolean> {
    return this.showCreateCeremony$;
  }

  // Mostrar u ocultar crear ceremony
  emmiterShowEditCeremony(val: Data): void {
    this.showEditCeremony$.next(val);
  }

  getSubjetShowEditCeremony(): Subject<Data> {
    return this.showEditCeremony$;
  }

  // Mostrar u ocultar crear reservation
  emmiterShowCreateReservation(val: Data): void {
    this.showCreateReservation$.next(val);
  }

  getSubjetShowCreateReservation(): Subject<Data> {
    return this.showCreateReservation$;
  }

  /**
   * SERVICIOS HTTP
   */

  getCeremonies() {
    return this.firestore.collection(
      'ceremonies',
      ref => ref.orderBy('date', 'asc')
    ).snapshotChanges();
  }

  createCeremony(ceremony: Ceremony) {
    delete ceremony.key;
    return this.firestore.collection('ceremonies').add(ceremony);
  }

  deleteCeremony(ceremony: Ceremony) {
    return this.firestore.doc('ceremonies/'+ ceremony.key).delete();
  }

  updateCeremony(ceremony: Ceremony) {
    var key = ceremony.key;
    delete ceremony.key;
    return this.firestore.doc(
      `ceremonies/${key}`
    ).update(ceremony);
  }

  createPlaceOfCeremony(ceremonyKey: string, place: Place) {
    delete place.id;
    return this.firestore.collection(`ceremonies/${ceremonyKey}/places`).add(place);
  }

  getPlacesOfCeremonies(ceremonyKey: string) {
    return this.firestore.collection(
      `ceremonies/${ceremonyKey}/places`,
      ref => ref.orderBy('position', 'asc')
    ).snapshotChanges();
  }


}
