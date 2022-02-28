import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, Observable } from 'rxjs';
import { IRestaurant } from 'src/app/Model/Restaurant';
import { RestaurantsService } from 'src/app/Service/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  Restaurants: IRestaurant[] | undefined;
  RestaurantsImages: any = [];
  RestaurantDeletedID:any;



  private baseUrl = "ResImges";
  constructor(private RestaurantService: RestaurantsService,
              private storage: AngularFireStorage) { 
 
    console.log("hello")
    // this.storage.ref(`${this.baseUrl}/7amza/Atract_7amza.jpg`).getDownloadURL().subscribe(downloadURL=>{
    //   this.RestaurantsImages = downloadURL;
    // })
  }

  ngOnInit(): void {
    this.RestaurantService.getRestaurants().subscribe((Res: any)=>{
      this.Restaurants = Res
      

    })
  }

  saveDeletedResID(id:any){
    this.RestaurantDeletedID = id;
  }

  deleteRes(){
    this.RestaurantService.deleteRestaurant(this.RestaurantDeletedID);
   
  }

}
