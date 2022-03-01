import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SideBarComponent} from './Components/side-bar/side-bar.component'
import { NavbarComponent } from './Components/navbar/navbar.component'
import { FooterComponent } from './Components/footer/footer.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire"; 
import { AngularFirestoreModule , AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorageModule, BUCKET  } from "@angular/fire/storage";
import { ConfirmRestComponent } from './Components/confirm-rest/confirm-rest.component';
import { RestaurantsComponent } from './Components/restaurants/restaurants.component'
import { TableComponent } from './Components/table/table.component'
import { RestaurantService } from './Service/restaurant.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDialogComponent } from './Components/custom-dialog/custom-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideBarService } from './Service/side-bar.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RestaurantsComponent,
    ConfirmRestComponent,
    TableComponent,
    CustomDialogComponent,
    SideBarComponent,

  
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
    MatSidenavModule,
    MatButtonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,  
  ],
  providers: [
    RestaurantService,
    AngularFirestore,
    SideBarService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
