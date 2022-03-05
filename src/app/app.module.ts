import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './Components/side-bar/side-bar.component'
import { NavbarComponent } from './Components/navbar/navbar.component'
import { FooterComponent } from './Components/footer/footer.component';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import {MatMenuModule} from '@angular/material/menu';
import { AngularFirestoreModule , AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorageModule, BUCKET  } from "@angular/fire/storage";
import { RestaurantsComponent } from './Components/restaurants/restaurants.component'
import { TableComponent } from './Components/table/table.component'
import { RestaurantService } from './Service/restaurant.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDialogComponent } from './Components/custom-dialog/custom-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmRestComponent } from './Components/confirm-rest/confirm-rest.component';
import { AdminService } from './Service/admin.service';
import { AdminsComponent } from './Components/admin-components/admins-list/admins.component';
import { AdminsAddComponent } from './Components/admin-components/admins-add/admins-add.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ListCareerComponent } from './Components/list-career/list-career.component';

import {FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { AddCareerComponent } from './Components/add-career/add-career.component';
import { AddJobComponent } from './Components/add-job/add-job.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { ProfileComponent } from './Components/profile/profile.component'
import {AngularFireAuthModule } from '@angular/fire/auth'
import { AuthService } from './Service/auth.service';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ResDetailsComponent } from './Components/res-details/res-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { AddBranchComponent } from './Components/add-branch/add-branch.component';
import { AddMealComponent } from './Components/add-meal/add-meal.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddRestaurantComponent } from './Components/add-restaurant/add-restaurant.component';
import { MainUIComponent } from './Components/main-ui/main-ui.component';
import { UiformComponent } from './Components/uiform/uiform.component';

@NgModule({
  declarations:[
    AppComponent,
    NavbarComponent,
    
    FooterComponent,
    RestaurantsComponent,
    TableComponent,
    CustomDialogComponent,
    SideBarComponent,
    ConfirmRestComponent,
    AdminsComponent,
    AdminsAddComponent,
    ListCareerComponent,
    JobDetailsComponent,
    AddCareerComponent,
    AddJobComponent,
    ProfileComponent,
    LogInComponent,
    ResDetailsComponent,
    AddBranchComponent,
    AddMealComponent,
    DashboardComponent,
    AddRestaurantComponent,
    MainUIComponent,
    UiformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    AngularFireAnalyticsModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [
    RestaurantService,
    AngularFirestore,
    AdminService,
    AuthService,
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
