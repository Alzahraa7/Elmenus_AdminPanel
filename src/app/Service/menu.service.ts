import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, Observable, of } from 'rxjs';
import { IMenu, IMenuCat } from '../Model/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  MenuCollec!: AngularFirestoreCollection<IMenu>;
  Menus: any;
  MenuCollecCat!: AngularFirestoreCollectionGroup<IMenuCat>;
  MenusCat:any;
  MenusCatSelected:any;
  MealDoc: AngularFirestoreDocument<IMenuCat> | undefined;
  constructor(public firestore: AngularFirestore) {
  }
  /*
  getMenuCat(data:IMenu,ResId:string|null){
    for (let i = 0; i < data.Name?.length; i++) {
      this.MenuCollecCat = this.firestore.collection(`Restaurant/${ResId}/Menu/${data.MenuID}/${data.Name[i]}`);
      console.log(this.MenuCollecCat.get())
      this.MenusCat = this.MenuCollecCat.snapshotChanges().pipe(map(changes => {
        return changes.map(res => {
          const data = res.payload.doc.data();
         // arr.push(data);
          data.CatID = res.payload.doc.id;
          console.log(data)
          return data;
        })
      }));
    }
    return this.MenusCat
  }*/

   getMenu(ResId: string | null):Observable<IMenu[]>{
    this.MenuCollec = this.firestore.collection(`Restaurant/${ResId}/Menu`);
    this.Menus = this.MenuCollec.snapshotChanges().pipe(map(changes => {
      let arr: IMenuCat[] = [];
      return changes.map( res => {
        const data = res.payload.doc.data();
        //console.log(data)
        data.MenuID = res.payload.doc.id;
        return data;
      })
    }));
    return this.Menus ;
  }

  getMenuCat(Menu:string):Observable<IMenuCat[]>{
    let arr:IMenuCat[]=[];
    //this.MenusCat = this.MenuCollecCat.valueChanges();
    //for(let i =0 ; i <Menu.Name.length ; i++){
        this.MenuCollecCat = this.firestore.collectionGroup(`${Menu}`);
        this.MenusCat= this.MenuCollecCat.snapshotChanges().pipe(map(changes => {
          let arr: IMenuCat[] = [];
          return changes.map( res => {
            const data = res.payload.doc.data();
            //console.log(data)
            data.CatID = res.payload.doc.id;
            return data;
          })
        }));
      //}
    return this.MenusCat;
  }

  getMenuCatSelected(selected:string):Observable<IMenuCat[]>{
    this.MenuCollecCat = this.firestore.collectionGroup(`${selected}`);
        this.MenusCatSelected = this.MenuCollecCat.snapshotChanges().pipe(map(changes => {
          return changes.map( res => {
            const data = res.payload.doc.data();
            data.CatID = res.payload.doc.id;
            return data;
          })
        }));
    return this.MenusCatSelected;
  }

  addMeal(Meal:IMenuCat,idRest:string,idMenu:string,NameMealcoll:string){
   let ID = this.firestore.createId()
   console.log(ID)
    this.firestore
      .collection('Restaurant')
      .doc(idRest)
      .collection<any>('Menu')
      .doc(idMenu)
      .collection<any>(NameMealcoll)
      .doc(ID)
      .set(Meal);
  }
  deleteMeal(ResID:any,MenuID:string,NameCat:string,MealID:string){
    console.log(ResID,MenuID,NameCat,MealID)
    this.MealDoc = this.firestore.doc(`Restaurant/${ResID}/Menu/${MenuID}/${NameCat}/${MealID}`);
    this.MealDoc.delete();

  }
}
