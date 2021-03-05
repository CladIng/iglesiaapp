import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

// Components
import { AdminComponent } from 'src/app/componets/admin/admin.component';

import { CreateCereminyComponent } from 'src/app/componets/admin/create-cereminy/create-cereminy.component';
import { EditCeremonyComponent } from 'src/app/componets/admin/edit-ceremony/edit-ceremony.component';
import { PlacesAdminComponent } from 'src/app/componets/admin/places-admin/places-admin.component';
import { EditReservationComponent } from 'src/app/componets/admin/places-admin/edit-reservation/edit-reservation.component';

@NgModule({
  declarations: [
    AdminComponent,

    CreateCereminyComponent,
    EditCeremonyComponent,

    PlacesAdminComponent,
    EditReservationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
