import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { map, Observable, of } from 'rxjs';
import { IRestaurant } from '../Model/irestaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  RestaurantCollec!:AngularFirestoreCollection<IRestaurant>;
  Rests:any;
  constructor(public firestore:AngularFirestore) {
    //this.Rests = firestore.collection('Restaurant').valueChanges();
    this.RestaurantCollec = firestore.collection('Restaurant' , ref=> ref.orderBy('ResName','asc'));
     
    this.Rests = this.RestaurantCollec.snapshotChanges().pipe(map(changes=>{
      return changes.map(res=>{
        const data = res.payload.doc.data() as IRestaurant;
        data.ResPushID = res.payload.doc.id;
        return data;
      })
    }))
  }

  getRestaurants():Observable<IRestaurant[]>{
    return this.Rests;
  }

  getRestById(id:string|null):Observable<IRestaurant>{
    this.Rests= this.firestore.doc(`Restaurant/${id}`).valueChanges();
    return this.Rests;
  }

  confirmRes(rest:IRestaurant){
    const ref = this.firestore.doc(`Restaurant/${rest.ResPushID}`);
    ref.update(rest);
  }


  deleteRes(id:string){
    const ref = this.firestore.doc(`Restaurant/${id}`);
    ref.delete();
  }

  updateRes(Res: IRestaurant){
    const ref = this.firestore.doc(`Restaurant/${Res.ResPushID}`);
    ref.update(Res);}
    
  addRestaurant(restaurant: IRestaurant){
    // console.log(restaurant)
    this.Rests = this.firestore.collection('Restaurant');
    this.Rests.add({ ...restaurant });
  }
}
