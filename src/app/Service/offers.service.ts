import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { IOffers } from '../Model/offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  OffersCollec!:AngularFirestoreCollection<IOffers>;
  Offers:any;
  constructor(public firestore:AngularFirestore) { }

  getOffers(ResId:string|null):Observable<IOffers[]>{
    this.OffersCollec = this.firestore.collection(`Restaurant/${ResId}/Offers`, ref=> ref.orderBy('PromoCode','asc'));
    this.Offers = this.OffersCollec.snapshotChanges().pipe(map(changes=>{
      return changes.map(res=>{
        const data = res.payload.doc.data();
        data.OfferId = res.payload.doc.id;
        return data;
      })
    }));
    return this.Offers;
  }

  updateOffer(ResId: string | null, offer: IOffers){
    const ref = this.firestore.doc(`Restaurant/${ResId}/Offers/${offer.OfferId}`);
    ref.update(offer)
  }

  deleteOffer(ResId:string|null,offer: IOffers){
    const ref = this.firestore.doc(`Restaurant/${ResId}/Offers/${offer.OfferId}`);
    ref.delete();
  }
}
