import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { IRestaurant } from 'src/app/Model/irestaurant';
import { RestaurantService } from 'src/app/Service/restaurant.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  Restaurants: IRestaurant[] = [];
  RestaurantsImages: any = [];
  RestaurantDeletedID:any;



  private baseUrl = "ResImges";
  constructor(private RestaurantService: RestaurantService,
              private storage: AngularFireStorage,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,) { 
     // this.storage.ref(`${this.baseUrl}/7amza/Atract_7amza.jpg`).getDownloadURL().subscribe(downloadURL=>{
    //   this.RestaurantsImages = downloadURL;
    // })
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['bg-success', 'text-white'],
      duration: 3000,
    });
  }
  ngOnInit(): void {
    this.RestaurantService.getRestaurants().subscribe((Res: any)=>{
      this.Restaurants = Res
      this.Restaurants = this.Restaurants.filter((res)=> res.IsActivated == true);

    })
  }

  saveDeletedResID(id:any){
    this.RestaurantDeletedID = id;

  }

  deleteRes(ResPushID:string){
    let dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { mess: `Are you sure you want to delete this Restaurant ?` },
    });
    dialogRef.afterClosed().subscribe((i) => {
      if (i.data) {
        this.RestaurantService.deleteRes(ResPushID);
        this.openSnackBar('Rest Delete Successfully');
      }
    });
    
   
  }

}
