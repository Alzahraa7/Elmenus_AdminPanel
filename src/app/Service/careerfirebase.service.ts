import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../ViewModel/career';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CareerfirebaseService {
  private dbPath = '/Careers';
  Careers:any;
  Jobs:any
  careersCollection:AngularFirestoreCollection<Career> | undefined
  constructor(private db:AngularFirestore) { 
    this.Careers = this.db.collection('Careers').valueChanges();
    this.Jobs = this.db.collectionGroup('Onboarding Specialist').valueChanges();
  }

  getAll(){
    return this.Careers;
  }
  getJobs(){
    return this.Jobs
  }
}
