import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { IRestaurant } from '../Model/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  Restaurants:any;
  RestaurantDoc : AngularFirestoreDocument<IRestaurant> | undefined;


  constructor(private fs: AngularFirestore) {
    this.Restaurants = this.fs.collection("Restaurant").snapshotChanges().pipe(map((changes:any)=>{
      return  changes.map((a:any)=>{
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;

        return data
      })
    }))
   }

  getRestaurants() {
    return this.Restaurants;
  }

  deleteRestaurant(RestaurantID:any){
    this.RestaurantDoc = this.fs.doc(`Restaurant/${RestaurantID}`);
    // this.RestaurantDoc.delete();
  }

}
