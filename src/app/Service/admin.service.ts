import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { IAdmin } from '../Model/admin';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  adminsCollection!:AngularFirestoreCollection<IAdmin>;
  admins : any;
  adminDocument!:AngularFirestoreDocument<IAdmin>;;

  constructor(public firestore:AngularFirestore) { 
    // this.admin =this.firestore.collection('Admins').valueChanges();
    this.adminsCollection = firestore.collection('Admins',ref => ref.orderBy('adminName','asc'));

    this.admins = this.adminsCollection.snapshotChanges().pipe(map(changes=>{
      return changes.map(adm=>{
        const data = adm.payload.doc.data() as IAdmin;
        data.adminPushID = adm.payload.doc.id;
        return data
      })
    }))

  }

  getAdmins() {
    return this.admins;
  }

  addAdmin(admin:IAdmin) {
    this.adminsCollection.add(admin)
  }

  deleteAdmin(adminPushID:string) {
    this.adminDocument =this.firestore.doc(`Admins/${adminPushID}`)
    this.adminDocument.delete();
  }
}


