import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './Components/navbar/navbar.component'
import { FooterComponent } from './Components/footer/footer.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire"; 
import { AngularFirestoreModule , AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorageModule, BUCKET  } from "@angular/fire/storage";
import { ConfirmRestComponent } from './Components/confirm-rest/confirm-rest.component';
import {RestaurantsComponent} from './Components/restaurants/restaurants.component'
import { TableComponent } from './Components/table/table.component'
import { RestaurantService } from './Service/restaurant.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomDialogComponent } from './Components/custom-dialog/custom-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ResDetailsComponent } from './Components/res-details/res-details.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RestaurantsComponent,
    ConfirmRestComponent,
    TableComponent,
    CustomDialogComponent,
    ResDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule
  ],
  providers: [
    RestaurantService,
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
