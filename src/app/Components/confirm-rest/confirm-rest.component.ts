import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IRestaurant } from 'src/app/Model/irestaurant';
import { RestaurantService } from 'src/app/Service/restaurant.service';

@Component({
  selector: 'confirm-rest',
  templateUrl: './confirm-rest.component.html',
  styleUrls: ['./confirm-rest.component.css'],
  providers: [
    AngularFirestore
  ]
})
export class ConfirmRestComponent implements OnInit {
  restNeedConfirm!:IRestaurant[];
  constructor(private restSrvs:RestaurantService) {
  }

  ngOnInit(): void {
    this.restSrvs.getRestaurants().subscribe((item:IRestaurant[])=>{
     // console.log(item);
      this.restNeedConfirm = item.filter(i=>{
       return i.IsActivated==false;
      });
      console.log(this.restNeedConfirm);
    })
  }
  

}
