import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { Restaurant } from '../Model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  Restaurants:any;
 

  constructor(private fs: AngularFirestore,
              private storage: AngularFireStorage) {
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


}
