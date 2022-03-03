import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlus,faTrash } from '@fortawesome/free-solid-svg-icons';
import { IBranches } from 'src/app/Model/branches';
import { IRestaurant } from 'src/app/Model/irestaurant';
import { IMenu, IMenuCat } from 'src/app/Model/menu';
import { IOffers } from 'src/app/Model/offers';
import { BranchesService } from 'src/app/Service/branches.service';
import { MenuService } from 'src/app/Service/menu.service';
import { OffersService } from 'src/app/Service/offers.service';
import { RestaurantService } from 'src/app/Service/restaurant.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

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
  faTrash = faTrash;
  constructor(private _snackBar: MatSnackBar,private actRout:ActivatedRoute, private restSrvs:RestaurantService, private brancessrvs:BranchesService, private offerSrvs:OffersService, private menuSrvs:MenuService,private router:Router,public dialog: MatDialog){
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
  openSnackBar(message: string) {
    this._snackBar.open(message,"",{
      horizontalPosition:"end",
      verticalPosition:"top",
      panelClass:['bg-success','text-white'],
      duration:2000
    });
  }

  sendSelected(val:any){
    console.log(val);
    this.menuSrvs.getMenuCatSelected(val).subscribe(i=>{
      this.MenuCatSelected = i;
    })
  }
  addMeal(id:string){
    console.log(this.ResId,id)
    console.log(this.selected)
    this.router.navigate(['\addMeal',id,this.ResId,this.selected])
  }
  
  deleteMeal(id:string){
    let dialogRef = this.dialog.open(CustomDialogComponent,{
      data:{mess:`Are you sure you want to delete this Meal ?`}
    });
    dialogRef.afterClosed().subscribe(i=>{
      if(i.data){
        this.menuSrvs.deleteMeal(this.ResId,this.Menus[0].MenuID,this.selected,id);
        this.openSnackBar(`You have deleted this meal`)
      }
    })
  }
}
