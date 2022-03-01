import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogIn = false
  constructor(private firebaseAuth: AngularFireAuth) { }

  async logIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.isLogIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  logOut(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
}
