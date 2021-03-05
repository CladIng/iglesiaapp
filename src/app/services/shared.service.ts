import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Data } from 'src/app/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private showNotification$ = new Subject<{
    type: number,
    message: string
  }>();

  private showLoader$ = new Subject<boolean>();
  
  constructor() { }

  // Mostrar u ocultar notificacion
  emmiterNotification(val: {
    type: number,
    message: string
  }): void {
    this.showNotification$.next(val);
  }

  getSubjetNotification(): Subject<{
    type: number,
    message: string
  }> {
    return this.showNotification$;
  }

  // Mostrar u ocultar loader
  emmiterLoader(val: boolean): void {
    this.showLoader$.next(val);
  }

  getSubjetLoader(): Subject<boolean> {
    return this.showLoader$;
  }

}
