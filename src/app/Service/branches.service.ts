import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { IBranches } from '../Model/branches';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  BranchesCollec!:AngularFirestoreCollection<IBranches>;
  Branches:any;
  IsSubmit:boolean =false;
  constructor(public firestore:AngularFirestore) {

  }

  getBranches(ResId:string|null):Observable<IBranches[]>{
    this.BranchesCollec = this.firestore.collection(`Restaurant/${ResId}/Branches`, ref=> ref.orderBy('LocName','asc'));
    this.Branches = this.BranchesCollec.snapshotChanges().pipe(map(changes=>{
      return changes.map(res=>{
        const data = res.payload.doc.data();
        data.BranchId = res.payload.doc.id;
        return data;
      })
    }));
    return this.Branches;
  }

  addBranch(newBranch:IBranches,ResId:string|null){
    this.BranchesCollec = this.firestore.collection(`Restaurant/${ResId}/Branches`);
    this.BranchesCollec.add(newBranch);
    this.IsSubmit = true;
  }

}
