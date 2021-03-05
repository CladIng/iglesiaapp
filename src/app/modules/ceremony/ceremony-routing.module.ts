import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeremoniesComponent } from "src/app/componets/ceremonies/ceremonies.component";
import { PlaceComponent } from "src/app/componets/ceremonies/place/place.component";

const routes: Routes = [
  {
    path: '',
    component: CeremoniesComponent
  },
  {
    path: 'ceremonies',
    component: CeremoniesComponent
  },
  {
    path: 'ceremonies/:id',
    component: PlaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeremonyRoutingModule { }
