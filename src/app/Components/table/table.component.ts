import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IRestaurant } from 'src/app/Model/Restaurant';
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RestaurantService } from 'src/app/Service/restaurant.service';
import {MatDialog} from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,OnChanges {
  @Input()restNeedConfirm!: IRestaurant[];
  faThumbIcon = faThumbsUp;
  faDelete = faTrash;
  constructor(private _snackBar: MatSnackBar ,private restSrvs:RestaurantService,public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,"",{
      horizontalPosition:"end",
      verticalPosition:"top",
      panelClass:['bg-success','text-white'],
      duration:2000
    });
  }


  ConfirmRes(rest:IRestaurant){
    let dialogRef = this.dialog.open(CustomDialogComponent,{
      data:{mess:`Are you sure you want to Confirm ${rest.ResName} ?`}
    });
    dialogRef.afterClosed().subscribe(i=>{
      if(i.data){
        rest.IsActivated = true;
        this.restSrvs.confirmRes(rest);
        this.openSnackBar(`You have confirmed ${rest.ResName}`)
      }
    })
  }

  DeleteRes(id:string,resName:string){
    let dialogRef = this.dialog.open(CustomDialogComponent,{
      data:{mess:`Are you sure you want to delete ${resName} ?`}
    });
    dialogRef.afterClosed().subscribe(i=>{
      if(i.data){
      this.restSrvs.deleteRes(id);
      this.openSnackBar(`You have deleted ${resName}`)
      }
    })
  }
}
