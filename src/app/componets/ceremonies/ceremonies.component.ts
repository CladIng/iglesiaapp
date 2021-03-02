import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CeremonyService } from "src/app/services/ceremony.service";

import { Ceremony } from "src/app/models/ceremony.model";

@Component({
  selector: 'app-ceremonies',
  templateUrl: './ceremonies.component.html',
  styleUrls: ['./ceremonies.component.sass']
})
export class CeremoniesComponent implements OnInit {
  
  ceremonies: Ceremony[];
  
  constructor(
    private _ceremonyService: CeremonyService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCeremonies();      
  }
    
  getCeremonies(): void {
    this._ceremonyService.getCeremonies().subscribe(data => {
      this.ceremonies = data.map(e => {
        const data = e.payload.doc.data() as Object
        return {
          key: e.payload.doc.id,
          ...data
        } as Ceremony;
      })
    });
  }

  createCereminy(): void {
    // this._ceremonyService.createCeremony({
    //   id: '111',
    //   name: 'cesar',
    //   date: Date()
    // }).then((e: any) => {
    //   console.log('hola', e)
    //   console.log('id', e.id);
    // });
  }

  deleteCeremony(ceremony: Ceremony): void {
    this._ceremonyService.deleteCeremony(ceremony).then((e: any) => {
      console.log('Elemento borrado', e)
    });
  }

  openPlaces(ceremonyKey: string): void {
    this._router.navigate([`ceremonies/${ceremonyKey}`]);
  }

}
