import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IBranches } from 'src/app/Model/branches';
import { IRestaurant } from 'src/app/Model/irestaurant';
import { IMenu, IMenuCat } from 'src/app/Model/menu';
import { IOffers } from 'src/app/Model/offers';
import { BranchesService } from 'src/app/Service/branches.service';
import { MenuService } from 'src/app/Service/menu.service';
import { OffersService } from 'src/app/Service/offers.service';
import { RestaurantService } from 'src/app/Service/restaurant.service';

@Component({
  selector: 'app-res-details',
  templateUrl: './res-details.component.html',
  styleUrls: ['./res-details.component.css']
})
export class ResDetailsComponent implements OnInit {
  Restaurant:IRestaurant|undefined;
  Branches:IBranches[]|undefined;
  Offers:IOffers[]|undefined;
  Menus!:IMenu[];
  MenuCatout:IMenuCat[]=[];
  MenuCatSelected:IMenuCat[]=[];
  ResId:string|null = null;
  selected = '';
  panelOpenState = false;
  plusIcon= faPlus;
  editIcon = faEdit;
  constructor(private actRout:ActivatedRoute, private restSrvs:RestaurantService, private brancessrvs:BranchesService, private offerSrvs:OffersService, private menuSrvs:MenuService){
   this.ResId= actRout.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.actRout.paramMap.subscribe(param=>{
      this.ResId = param.get('id');
      this.restSrvs.getRestById(this.ResId).subscribe(res=>{
        this.Restaurant = res;
      });
    })
    this.brancessrvs.getBranches(this.ResId).subscribe((branch:IBranches[])=>{
      this.Branches = branch;
    });
    this.offerSrvs.getOffers(this.ResId).subscribe((offer:IOffers[])=>{
      this.Offers = offer;
    })
    this.menuSrvs.getMenu(this.ResId).subscribe((Menu:IMenu[])=>{
      //console.log(Menu)
      this.Menus = Menu;
      for(let j =0 ;j <this.Menus[0]?.Name.length; j++){
        this.menuSrvs.getMenuCat(this.Menus[0].Name[j]).subscribe((MenuCat:IMenuCat[])=>{
          for(let i = 0 ; i< MenuCat.length; i++){
            this.MenuCatout.push(MenuCat[i])
          }
          console.log(this.MenuCatout)
        })
      }
    });
  }

  sendSelected(val:any){
    console.log(val);
    this.menuSrvs.getMenuCatSelected(val).subscribe(i=>{
      this.MenuCatSelected = i;
    })
  }

}
