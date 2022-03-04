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
  MenuCollecSelected!: AngularFirestoreCollection<IMenuCat>;
  MenusCatSelected:any;
  MealDoc: AngularFirestoreDocument<IMenuCat> | undefined;
  MenuCollecDoc:AngularFirestoreDocument<IMenuCat>|undefined
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
            console.log(data)
            data.CatID = res.payload.doc.id;
            return data;
          })
        }));
      //}
    return this.MenusCat;
  }

  getMenuCatSelected(selected:string,ResID:string|null):Observable<IMenuCat[]>{
    this.MenuCollecSelected = this.firestore.collection(`Restaurant/${ResID}/Menu`);
        this.MenusCatSelected = this.MenuCollecSelected.snapshotChanges().pipe(map(changes => {
          return changes.map( res => {
            const data = res.payload.doc.data();
            data.CatID = res.payload.doc.id;
            return res.payload.doc.id;
          })
        }));
        this.MenuCollecSelected.valueChanges().subscribe(i=>console.log(i))
    return this.MenusCatSelected;
  }
  getMenuSelected2(id:any,ResID:string|null,selected:string):Observable<IMenuCat[]>{
    console.log(id)
    this.MenuCollecSelected = this.firestore.collection(`Restaurant/${ResID}/Menu/${id}/${selected}`);
        this.MenusCatSelected = this.MenuCollecSelected.snapshotChanges().pipe(map(changes => {
          return changes.map( res => {
            const data = res.payload.doc.data();
            data.CatID = res.payload.doc.id;
            return data;
          })
        }));
        this.MenuCollecSelected.valueChanges().subscribe(i=>console.log(i))
    return this.MenusCatSelected;
  }

  addMeal(Meal:IMenuCat,RestID:string,MenuID:string,NameMealcoll:string){
   let ID = this.firestore.createId()
   console.log(ID)
    this.firestore
      .collection('Restaurant')
      .doc(RestID)
      .collection<any>('Menu')
      .doc(MenuID)
      .collection<any>(NameMealcoll)
      .doc(ID)
      .set(Meal);
  }
  deleteMeal(ResID:any,MenuID:string,NameCat:string,MealID:string){
    console.log(ResID,MenuID,NameCat,MealID)
    this.MealDoc = this.firestore.doc(`Restaurant/${ResID}/Menu/${MenuID}/${NameCat}/${MealID}`);
    this.MealDoc.delete();

  }
  addNameMenu(Menu:IMenu,ResID:any){
    const ref = this.firestore.doc(`Restaurant/${ResID}/Menu/${Menu.MenuID}`);
    ref.update(Menu);
  }
  addMenuCollec(RestID:any,MenuCollec:IMenu){
    let ID = this.firestore.createId()
    MenuCollec.MenuID=ID;
    console.log(ID)
     this.firestore
       .collection('Restaurant')
       .doc(RestID)
       .collection<any>('Menu').doc(ID).set(MenuCollec)

  }
  deleteMenuCollec(ResID:any,Menu:IMenu,CollectionName:string){


    this.firestore
    .collection(`Restaurant/${ResID}/Menu/${Menu.MenuID}/${CollectionName}`)
    .snapshotChanges()
    .pipe(
      map((changes: any) => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data() as any;
          data.CatID = a.payload.doc.id;
          return data;
        });
      })
    )
    .subscribe((Menus: IMenuCat[]) => {
      for (let i = 0; i < Menus.length; i++) {
        let CollectionMenuID = Menus[i].CatID;
        this.MenuCollecDoc = this.firestore.doc(`Restaurant/${ResID}/Menu/${Menu.MenuID}/${CollectionName}/${CollectionMenuID}`);
        this.MenuCollecDoc.delete();
      }

      let ref = this.firestore.doc(`Restaurant/${ResID}/Menu/${Menu.MenuID}`);
      ref.update(Menu);

    });

  }
}
