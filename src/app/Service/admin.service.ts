import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { IAdmin } from '../Model/admin';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  adminsCollection!:AngularFirestoreCollection<IAdmin>;
  admins : any;

  adminDocument!:AngularFirestoreDocument<IAdmin>;
  admin:any;

  constructor(public firestore:AngularFirestore) { 
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

  getAdmin(adminPushID:string|null):Observable<IAdmin>{
    this.admin = this.firestore.doc(`Admins/${adminPushID}`).valueChanges();
    return this.admin
  }

  addAdmin(admin:IAdmin) {
    this.adminsCollection.add(admin)
  }

  updateAdmin(adminName:string,adminEmail:string,adminPassword:string,adminPushID:string){
  
    this.adminDocument = this.firestore.doc(`Admins/${adminPushID}`)
    
    this.adminDocument.update({adminName:adminName})
    this.adminDocument.update({adminEmail:adminEmail})
    this.adminDocument.update({adminPassword:adminPassword})
  }

  deleteAdmin(adminPushID:string) {
    this.adminDocument =this.firestore.doc(`Admins/${adminPushID}`)
    this.adminDocument.delete();
  }
}


