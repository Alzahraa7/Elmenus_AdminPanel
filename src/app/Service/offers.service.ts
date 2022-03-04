import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { IAdmin } from '../Model/admin';
import { map, Observable, of } from 'rxjs';
import { IOffers } from '../Model/offers';
import { IRestaurant } from '../Model/restaurant';



@Injectable({
  providedIn: 'root'
})

export class OffersService {

  offersCollection!:AngularFirestoreCollection<IOffers>;
  offers : any;

  offersArr:IOffers[]|any;

  offerDocument!:AngularFirestoreDocument<IOffers>;
  offer:any;

  RestaurantCollec!:AngularFirestoreCollection<IRestaurant>;
  Rests:any;

  rest:any;

  constructor(public firestore:AngularFirestore) {


    this.RestaurantCollec = firestore.collection('Restaurant')
    this.Rests = this.RestaurantCollec.snapshotChanges().pipe(map(changes=>{
      return changes.map(res=>{
        const data = res.payload.doc.data() as IRestaurant;
        data.ResPushID = res.payload.doc.id;
        return data;
      })
    }))




    this.offersArr =this.firestore
    .collectionGroup('Offers')
    .snapshotChanges()
    .pipe(
      map((changes:any)=>{
        return changes.map((o:any)=>{
          const data = o.payload.doc.data() as any;
          data.id = o.payload.doc.id;
          return data;
        })
      })
    );

    this.offersArr.subscribe((res:any)=>console.log(res))

  

   }

   getRestaurants():Observable<IRestaurant[]>{
    return this.Rests;
  }


  getRestaurant(ResPushID:string|null):Observable<IRestaurant>{
    this.rest = this.firestore.doc(`Restaurants/${ResPushID}`).valueChanges();
    return this.rest
  }

   getOffers() {
    return this.offers;
  }

  getOffer(adminPushID:string|null):Observable<IOffers>{
    this.offer = this.firestore.doc(`Offers/${adminPushID}`).valueChanges();
    return this.offer
  }

  addOffer(offer:IOffers,paramResId:string) {
    this.getRestaurant(paramResId).subscribe((res)=>{

    })
    this.offersCollection.add(offer)
  }

  addRestaurant(restaurant: IRestaurant){

    this.Rests = this.firestore.collection('Restaurant');
    this.Rests.add({ ...restaurant });
  }
}

