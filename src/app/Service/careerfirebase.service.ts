import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { ICareer } from '../Model/icareer';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { IJob } from '../Model/ijob';
@Injectable({
  providedIn: 'root',
})
export class CareerfirebaseService {
  private dbPath = '/Careers';
  CareersRef: ICareer[]|any;
  Careers:ICareer[]|any;
  Jobs: IJob[]|any;
  IdJob: string = '';
  ID: string="";
  JobData: IJob[]|undefined;
  careersCollection: AngularFirestoreCollection<ICareer> | undefined;
  jobDoc: AngularFirestoreDocument<IJob> | undefined;
  CareerDoc: AngularFirestoreDocument<ICareer> | undefined;
  CareerDocID: string="";
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
  deleteJob(job: IJob, Career: ICareer) {
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
      .subscribe((jobs: IJob[]) => {
        this.IdJob = jobs[0].id;
        console.log(Career.id);
        this.jobDoc = this.db.doc(`Careers/${Career.id}/${job}/${this.IdJob}`);
        this.jobDoc.delete()
        console.log(`Careers/${Career.id}/${job}/${this.IdJob}`);
      });
  }
  deleteCareer(Career: ICareer) {
    this.CareerDoc = this.db.doc(`Careers/${Career.id}`);
     this.CareerDoc.delete();
  }
  addCareer(Career: ICareer) {
    this.CareersRef = this.db.collection('Careers');
    this.CareersRef.add({ ...Career });
  }

  getJobID(NameJob: string) {
    return this.db
      .collectionGroup(`${NameJob}`)
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

  UpdateCareer(Career: ICareer, id: string) {
    console.log(Career.id);
    this.CareerDoc = this.db.doc(`Careers/${id}`);
    this.CareerDoc.update(Career);
  }
 UpdateJob(JobDtails:IJob,NameJob:string, idJob:string,idCareer:string ){
  console.log(idCareer,NameJob,idJob);
  this.CareerDoc = this.db.doc(`Careers/${idCareer}/${NameJob}/${idJob}`);
  this.CareerDoc.update(JobDtails);
     
 }
  addDetailsJob(Job: IJob, IDDoc:string,NameCollection:string) {
   let idJob=this.db.createId()
    this.db
      .collection('Careers')
      .doc(IDDoc)
      .collection<any>(NameCollection)
      .doc(idJob)
      .set(Job);
  }
}
