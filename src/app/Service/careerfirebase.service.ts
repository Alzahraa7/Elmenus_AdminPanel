import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Career } from '../ViewModel/career';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Job } from '../ViewModel/job';
@Injectable({
  providedIn: 'root',
})
export class CareerfirebaseService {
  private dbPath = '/Careers';
  CareersRef: any;
  Careers: any;
  Jobs: any;
  IdJob: string = '';
  ID: any;
  JobData: any;
  careersCollection: AngularFirestoreCollection<Career> | undefined;
  jobDoc: AngularFirestoreDocument<any> | undefined;
  CareerDoc: AngularFirestoreDocument<Career> | undefined;
  CareerDocID: any;
  constructor(private db: AngularFirestore ) {
    // this.Careers = this.db.collection('Careers').valueChanges();
    this.Jobs = this.db
      .collectionGroup('Onboarding Specialist')
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    this.Careers = this.db
      .collection('Careers')
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );

    //   db.collection("Careers").doc("pFj1ptR5Dyr6DFiuwDKX").set({
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA"
    // })
    //  const tmpObj = {
    //     title: "vm.pageTitle",
    //     desc: "description",
    //     creationDate: "dt.getTime()"
    //   }

    // db.collection('Careers').doc("pFj1ptR5Dyr6DFiuwDKX").collection<any>("AllPages").doc("ss").set(tmpObj)
  }

  getAllCareers() {
    return this.Careers;
  }
  getJobs() {
    return this.Jobs;
  }
  deleteJob(job: any, Career: any) {
    this.db
      .collectionGroup(`${job}`)
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      )
      .subscribe((jobs: any) => {
        this.IdJob = jobs[0].id;
        console.log(Career.id);
        this.jobDoc = this.db.doc(`Careers/${Career.id}/${job}/${this.IdJob}`);
        this.jobDoc.delete()
        console.log(`Careers/${Career.id}/${job}/${this.IdJob}`);
      });
  }
  deleteCareer(Career: any) {
    this.CareerDoc = this.db.doc(`Careers/${Career.id}`);
     this.CareerDoc.delete();
  }
  addCareer(Career: Career) {
    this.CareersRef = this.db.collection('Careers');
    this.CareersRef.add({ ...Career });
  }

  getJobID(Job: any) {
    return this.db
      .collectionGroup(`${Job}`)
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }
  getCareerByID(ID: string) {
    return this.db.doc(`Careers/${ID}`).ref.get();
  }

  UpdateCareer(Career: any, id: string) {
    console.log(Career.id);
    this.CareerDoc = this.db.doc(`Careers/${id}`);
    this.CareerDoc.update(Career);
  }
 UpdateJob(JobDtails:any,NameJob:string, idJob:string ){
  console.log(JobDtails);
  this.CareerDoc = this.db.doc(`${NameJob}/${idJob}`);
  this.CareerDoc.update(JobDtails);
     
 }
  addDetailsJob(Job: Job, IDDoc:string,NameCollection:string) {
   let idJob=this.db.createId()
    this.db
      .collection('Careers')
      .doc(IDDoc)
      .collection<any>(NameCollection)
      .doc(idJob)
      .set(Job);
  }
}
