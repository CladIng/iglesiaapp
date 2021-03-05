import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { CeremonyService } from "src/app/services/ceremony.service";
import { SharedService } from "src/app/services/shared.service";

import { Ceremony } from "src/app/models/ceremony.model";

@Component({
  selector: 'app-ceremonies',
  templateUrl: './ceremonies.component.html',
  styleUrls: ['./ceremonies.component.sass']
})
export class CeremoniesComponent implements OnInit {
  
  ceremonies: Ceremony[];
  loading: boolean = false;
  
  constructor(
    private _ceremonyService: CeremonyService,
    private _sharedService: SharedService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCeremonies();      
  }
    
  getCeremonies(): void {
    this.loading = true;
    this._ceremonyService.getCeremonies().subscribe(data => {
      this.ceremonies = data.map(e => {
        const data = e.payload.doc.data() as Object
        return {
          key: e.payload.doc.id,
          ...data
        } as Ceremony;
      })
      this.loading = false;
    });
  }

  openPlaces(ceremonyKey: string): void {
    this._router.navigate([`ceremonies/${ceremonyKey}`]);
  }

}
