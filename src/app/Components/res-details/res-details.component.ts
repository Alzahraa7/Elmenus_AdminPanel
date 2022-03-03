import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  Restaurant: IRestaurant | undefined;
  Branches: IBranches[] | undefined;
  Offers: IOffers[] | undefined;
  Menus!: IMenu[];
  MenuCatout: IMenuCat[] = [];
  MenuCatSelected: IMenuCat[] = [];
  ResId: string | null = null;
  selected = '';
  panelOpenState = false;
  plusIcon = faPlus;
  editIcon = faEdit;

  //Update Data
  NameFlag = false;
  ownerFlg = false;
  phoneFlag = false;
  moodFlag = false;
  typeFlag = false;
  changedMood: string[] = [];
  changedType: string[] = [];
  errorShow = false;
  errorTypeShow = false;
  @ViewChild('ResNameInput') resNameInput !: ElementRef;
  @ViewChild('ownerNameInput') ownerNameInput !: ElementRef;
  @ViewChild('PhoneInput') phoneInput !: ElementRef;
  @ViewChild('MoodInput') moodInput !: ElementRef;
  @ViewChild('TypeInput') typeInput !: ElementRef;
  faTrash = faTrash;


  constructor(
    private _snackBar: MatSnackBar,
    private actRout: ActivatedRoute,
    private restSrvs: RestaurantService,
    private brancessrvs: BranchesService,
    private offerSrvs: OffersService,
    private menuSrvs: MenuService,
    public dialog: MatDialog,
    private router:Router
    ) {

    this.ResId = actRout.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {
    this.actRout.paramMap.subscribe(param => {
      this.ResId = param.get('id');
      this.restSrvs.getRestById(this.ResId).subscribe(res => {
        this.Restaurant = res;
        this.changedMood = this.Restaurant?.Mood ? this.Restaurant?.Mood : [];
        this.changedType = this.Restaurant?.Type ? this.Restaurant?.Type : [];
      });
    })
    this.brancessrvs.getBranches(this.ResId).subscribe((branch: IBranches[]) => {
      this.Branches = branch;
    });
    this.offerSrvs.getOffers(this.ResId).subscribe((offer: IOffers[]) => {
      this.Offers = offer;
    })
    this.menuSrvs.getMenu(this.ResId).subscribe((Menu: IMenu[]) => {
      //console.log(Menu)
      this.Menus = Menu;
      for (let j = 0; j < this.Menus[0]?.Name.length; j++) {
        this.menuSrvs.getMenuCat(this.Menus[0].Name[j]).subscribe((MenuCat: IMenuCat[]) => {
          for (let i = 0; i < MenuCat.length; i++) {
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

  sendSelected(val: any) {
    console.log(val);
    this.menuSrvs.getMenuCatSelected(val).subscribe(i => {
      this.MenuCatSelected = i;
    })
  }


  // shrouk --> UPdate Basic Res
  updateBasicRes(ResNumber: any) {
    // this.NameFlag = this.NameFlag ? false : true;
    console.log(ResNumber)
    switch (ResNumber) {
      case 1:
        this.NameFlag = this.NameFlag ? false : true;
        break;
      case 2:
        this.ownerFlg = this.ownerFlg ? false : true;
        break;
      case 3:
        this.phoneFlag = this.phoneFlag ? false : true;
        break;
      case 4:
        this.moodFlag = this.moodFlag ? false : true;
        break;
      case 5:
        this.typeFlag = this.typeFlag ? false : true;
        break;
      default:
        break;
    }
  }

  saveUpdateMood(updateMood: string, index: number) {
    // console.log(this.Restaurant?.Mood)
    this.changedMood[index] = updateMood;
    // this.changedMood = this.Restaurant?.Mood ? this.Restaurant?.Mood : [];
    // this.changedMood = [...this.changedMood, test];
    // console.log(this.changedMood);
  }
  saveUpdateType(updateType: string, index: number) {
    this.changedType[index] = updateType;
  }

  updateRes() {
    // let test = []
    // console.log(this.moodInput.nativeElement.value)
    console.log(this.changedMood)
    // console.log(this.changedType)
    // test.push(this.moodInput.nativeElement.value)
    // console.log(this.Restaurant?.Mood)
    let updateRes: IRestaurant = this.Restaurant as IRestaurant;

    updateRes.ResPushID = this.ResId ? this.ResId : "";
    updateRes.ResName = this.resNameInput.nativeElement.value;
    updateRes.OwnerName = this.ownerNameInput.nativeElement.value;
    updateRes.Phone = this.phoneInput.nativeElement.value;
    // updateRes.Mood = this.moodInput.nativeElement.value;
    updateRes.Mood = this.changedMood;
    updateRes.Type = this.changedType;
    this.restSrvs.updateRes(updateRes);
    // alert("updated")
  }


  deleteMood(delMood: string) {

    let dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { mess: `Are you sure you want to delete ${delMood} ?` }
    });
    dialogRef.afterClosed().subscribe(i => {
      if (i.data) {
        this.changedMood = this.changedMood.filter(mood => mood != delMood)
        this.updateRes();
      }
    })
  }
  addNewMood() {
    if(this.changedMood.includes('')){
      this.errorShow = true;
    }
    else{
      this.changedMood.push('')
      // this.updateRes();
    }
 
  }

  deleteType(delType: string) {
    let dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { mess: `Are you sure you want to delete ${delType} ?` }
    });
    dialogRef.afterClosed().subscribe(i => {
      if (i.data) {
        this.changedType = this.changedType.filter(type => type != delType)
    this.updateRes();
      }
    })
  }
  addNewType() {
    if(this.changedType.includes('')){
      this.errorTypeShow = true;
    }else{
      this.changedType.push('')
      // this.updateRes();
    }
   
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
