import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ListCareerComponent } from './Components/list-career/list-career.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { AddCareerComponent } from './Components/add-career/add-career.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddJobComponent } from './Components/add-job/add-job.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ListCareerComponent,
    JobDetailsComponent,
    AddCareerComponent,
    AddJobComponent
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
