import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CeremonyRoutingModule } from './ceremony-routing.module';

import { CeremoniesComponent } from "src/app/componets/ceremonies/ceremonies.component";
import { PlaceComponent } from 'src/app/componets/ceremonies/place/place.component';
import { ReservationComponent } from 'src/app/componets/ceremonies/place/reservation/reservation.component';

@NgModule({
  declarations: [
    CeremoniesComponent,
    PlaceComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    CeremonyRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CeremonyModule { }
