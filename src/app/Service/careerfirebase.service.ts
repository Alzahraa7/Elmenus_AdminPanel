import { Injectable } from '@angular/core';

import { Observable,map } from 'rxjs';
import { Career } from '../ViewModel/career';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CareerfirebaseService {
  private dbPath = '/Careers';
  CareersRef:any;
  Careers:any;
  Jobs:any;
  IdJob:string="";
  ID:any;
  JobData:any
  careersCollection:AngularFirestoreCollection<Career> | undefined
  jobDoc:AngularFirestoreDocument<any> |undefined
  CareerDoc: AngularFirestoreDocument<Career> |undefined
  constructor(private db:AngularFirestore) { 
    // this.Careers = this.db.collection('Careers').valueChanges();
    this.Jobs = this.db.collectionGroup('Onboarding Specialist').snapshotChanges().pipe(map( (changes:any) =>{
      return  changes.map((a:any)=>{
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data
      })
    }))
    this.Careers = this.db.collection('Careers').snapshotChanges().pipe(map( (changes:any) =>{
      return  changes.map((a:any)=>{
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data
      })
    }))
    
  }

  
  

  getAll(){
    return this.Careers;
  }
  getJobs(){
    return this.Jobs
  }
  deleteJob(job:any,Career:any){
    
     this.db.collectionGroup(`${job}`).snapshotChanges().pipe(map( (changes:any) =>{
      return  changes.map((a:any)=>{
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data
      })
    })).subscribe((jobs:any)=>{
    
      this.IdJob=jobs[0].id;
      console.log(Career.id);
     
        this.jobDoc = this.db.doc(`${Career.id}/${job}`);
      //  this.jobDoc.delete()
      console.log(`Careers/${Career.id}/${job}/${this.IdJob}`)
    })

  }
  deleteCareer(Career:any){
    this.CareerDoc = this.db.doc(`Careers/${Career.id}`);
    // this.CareerDoc.delete();

    
  }
  add(){
   this.CareersRef= this.db.collection('Careers');
   const ref={ Name:"string",
    Jobs:[
        {Address:"string",Name:"string"}
    ]}
   this.CareersRef.add({...ref})
  }

  getJobID(Job:any){
    return(

    this.db.collectionGroup(`${Job}`).snapshotChanges().pipe(map( (changes:any) =>{
      return  changes.map((a:any)=>{
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data
      })
    }))

    )
  }




}
