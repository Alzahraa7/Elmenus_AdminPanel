import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCollectionBranchesComponent } from './Components/add-collection-branches/add-collection-branches.component';
import { AddCollectionOffersComponent } from './Components/add-collection-offers/add-collection-offers.component';
import { AddMealComponent } from './Components/add-meal/add-meal.component';
@NgModule({
  declarations: [
    AppComponent,
    AddCollectionBranchesComponent,
    AddCollectionOffersComponent,
    AddMealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
