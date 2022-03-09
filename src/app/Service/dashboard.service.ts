import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IRestaurant } from '../Model/irestaurant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  collec!:AngularFirestoreCollection;
  constructor(public firestore: AngularFirestore) {
  }

  getRestaurantCount():Observable<any>{
    this.collec = this.firestore.collection('Restaurant');
    const RestCount = this.collec.valueChanges();
    return RestCount;
  }

  getCareersCount():Observable<any>{
    this.collec = this.firestore.collection('Careers');
    const CareersCount = this.collec.get();
    return CareersCount;
  }

  getUserCount():Observable<any>{
    this.collec = this.firestore.collection('User');
    const UserCount = this.collec.get();
    return UserCount;
  }

  getCities():Observable<any>{
    this.collec = this.firestore.collection('Cities');
    const CityCount = this.collec.get();
    return CityCount;
  }


}
