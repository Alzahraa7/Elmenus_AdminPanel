import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { IAdmin } from '../Model/admin';
import { map, Observable, of } from 'rxjs';
import { IOffers } from '../Model/offers';



@Injectable({
  providedIn: 'root'
})

export class OffersService {

  offersCollection!:AngularFirestoreCollection<IOffers>;
  offers : any;

  offerDocument!:AngularFirestoreDocument<IOffers>;
  offer:any;

  constructor(public firestore:AngularFirestore) {
    this.offersCollection = firestore.collection('Offers');

    this.offers = this.offersCollection.snapshotChanges().pipe(map(changes=>{
      return changes.map(adm=>{
        const data = adm.payload.doc.data() as IOffers;
        data.OffersPushID = adm.payload.doc.id;
        return data
      })
    }));


   }

   getAdmins() {
    return this.offers;
  }

  getAdmin(adminPushID:string|null):Observable<IAdmin>{
    this.offer = this.firestore.doc(`Admins/${adminPushID}`).valueChanges();
    return this.offer
  }

  addAdmin(admin:IAdmin) {
    // this.offersCollection.add(admin)
  }

  updateAdmin(adminName:string,adminEmail:string,adminPassword:string,adminPushID:string){
  
    this.offerDocument = this.firestore.doc(`Admins/${adminPushID}`)
    
    // this.offerDocument.update({adminName:adminName})
    // this.offerDocument.update({adminEmail:adminEmail})
    // this.offerDocument.update({adminPassword:adminPassword})
  }

  deleteAdmin(adminPushID:string) {
    this.offerDocument =this.firestore.doc(`Admins/${adminPushID}`)
    this.offerDocument.delete();
  }
}

