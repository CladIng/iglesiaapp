import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from "src/app/componets/admin/admin.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/modules/ceremony/ceremony.module').then(m => m.CeremonyModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class MainRoutingModule { }
