import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire"; 
import { AngularFirestoreModule , AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorageModule, BUCKET  } from "@angular/fire/storage";


import { RestaurantService } from './Service/restaurant.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AddCollectionBranchesComponent } from './Components/add-collection-branches/add-collection-branches.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCollectionBranchesComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    FontAwesomeModule,
  
  ],
  providers: [
    RestaurantService,
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
