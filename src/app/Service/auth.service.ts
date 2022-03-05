import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {IAdmin} from '../Model/IAdmin'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isloggedSubject: BehaviorSubject<boolean>;
  
  //get admins from firestore
  adminCollection!: AngularFirestoreCollection<IAdmin>;
  admins: Observable<any>;
  constructor(private firebaseAuth: AngularFireAuth,
              public angFirStr: AngularFirestore) {

    this.isloggedSubject=new BehaviorSubject<boolean> (this.isUserLogged);
    
    this.admins = this.angFirStr.collection('Admins').snapshotChanges().pipe(map((changes: any)=>{
      return changes.map((a: any)=>{
        const data = a.payload.doc.data() as any;
        data.Name = a.payload.doc.Name;
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
      localStorage.setItem('userTaken', JSON.stringify(res.user?.uid))
      this.isloggedSubject.next(true);  
    })
  }

  logOut(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('email')
    localStorage.removeItem('userTaken')
    this.isloggedSubject.next(false);

  }

  get isUserLogged(): boolean
  {
    return  (localStorage.getItem('userTaken'))? true: false
  }

  getloggedStatus(): Observable<boolean>
  {
    return this.isloggedSubject.asObservable();
  }

  
}

