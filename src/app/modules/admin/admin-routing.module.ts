import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from "src/app/componets/admin/admin.component";
import { PlacesAdminComponent } from "src/app/componets/admin/places-admin/places-admin.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'ceremony/:id',
    component: PlacesAdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
