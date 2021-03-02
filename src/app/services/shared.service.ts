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
  
  constructor() { }

  // Mostrar u ocultar crear ceremony
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

}
