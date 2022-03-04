import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import {IAdmin} from '../Model/IAdmin'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminDocument!: AngularFirestoreDocument<IAdmin>;
  
  //get admins from firestore
  adminCollection!: AngularFirestoreCollection<IAdmin>;
  admins: Observable<any>;
  constructor(private firebaseAuth: AngularFireAuth,
              public angFirStr: AngularFirestore) {
    
    this.admins = this.angFirStr.collection('Admins').snapshotChanges().pipe(map((changes: any)=>{
      return changes.map((a: any)=>{
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    }))
  };

  getAdmins(){
    return this.admins;
  }


  //Auth operation
  isLogIn = false
  async logIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.isLogIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
      localStorage.setItem('email', JSON.stringify(res.user?.email))

     
    })
  }

  logOut(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

  updateAdmin(admin: IAdmin){
    this.adminDocument = this.angFirStr.doc(`admins/${admin.adminPushID}`);
    this.adminDocument.update(admin);
  }

  
}

