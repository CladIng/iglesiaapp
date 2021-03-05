import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, 'es')

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';

import { MainModule } from "src/app/modules/main/main.module";
import { MainRoutingModule } from "src/app/modules/main/main-routing.module";

// Componentes globales
import { BottomBarComponent } from "src/app/componets/shared/bottom-bar/bottom-bar.component";
import { NotificationComponent } from './componets/shared/notification/notification.component';
import { LoaderComponent } from './componets/shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,

    // Globales
    BottomBarComponent,

    NotificationComponent,

    LoaderComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    MainModule,
    MainRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
