import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CeremonyService } from "src/app/services/ceremony.service";

import { Ceremony } from "src/app/models/ceremony.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  ceremonies: Ceremony[] = [];
  
  constructor(
    private _ceremonyService: CeremonyService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCeremonies();
  }

  showCreateCeremony(): void {
    this._ceremonyService.emmiterShowCreateCeremony(true);
  }

  openPlaces(ceremonyKey: string): void {
    this._router.navigate([`admin/ceremony/${ceremonyKey}`]);
  }

  getCeremonies(): void {
    this._ceremonyService.getCeremonies().subscribe(data => {
      this.ceremonies = data.map(e => {
        const data = e.payload.doc.data() as Object
        return {
          key: e.payload.doc.id,
          ...data
        } as Ceremony;
      });
    });
  }

  deleteCeremony(ceremony: Ceremony): void {
    this._ceremonyService.deleteCeremony(ceremony).then((e: any) => {
      console.log('Elemento borrado', e)
    });
  }

}
