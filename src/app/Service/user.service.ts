import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { map } from 'rxjs';
import { IUser } from '../Model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection!:AngularFirestoreCollection<IUser>;
  users : any;

  constructor(public firestore:AngularFirestore) { 
    this.usersCollection = firestore.collection('User',ref => ref.orderBy('Name','asc'));

    this.users = this.usersCollection.snapshotChanges().pipe(map(changes=>{
      return changes.map(adm=>{
        const data = adm.payload.doc.data() as IUser;
        data.id = adm.payload.doc.id;
        return data
      })
    }))
     
  }
  getAllUsers() {
    return this.users;
  }
  DeleteUser(userID:string){
    const ref = this.firestore.doc(`User/${userID}`);
    ref.delete();
  }
}
