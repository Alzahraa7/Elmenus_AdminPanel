import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, Observable } from 'rxjs';
import { IRestaurant } from 'src/app/Model/irestaurant';
import { RestaurantService } from 'src/app/Service/restaurant.service';

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
              private storage: AngularFireStorage) { 
     // this.storage.ref(`${this.baseUrl}/7amza/Atract_7amza.jpg`).getDownloadURL().subscribe(downloadURL=>{
    //   this.RestaurantsImages = downloadURL;
    // })
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

  deleteRes(){
    this.RestaurantService.deleteRes(this.RestaurantDeletedID);
   
  }

}
