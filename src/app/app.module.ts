import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './Components/navbar/navbar.component'
import { FooterComponent } from './Components/footer/footer.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestore, AngularFirestoreModule , AngularFirestoreCollection} from "angularfire2/firestore";
import { AngularFireStorageModule, BUCKET  } from "@angular/fire/storage";
import { ConfirmRestComponent } from './Components/confirm-rest/confirm-rest.component';
import { TableComponent } from './Components/table/table.component'
import { RestaurantService } from './Service/restaurant.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomDialogComponent } from './Components/custom-dialog/custom-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ConfirmRestComponent,
    TableComponent,
    CustomDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    RestaurantService,
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
