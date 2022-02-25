import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurantService } from 'src/app/Service/restaurant.service';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<CustomDialogComponent>) { }

  ngOnInit(): void {
  }
  DoAction(){
    this.dialogRef.close({data:true});
  }
  Dont(){
    this.dialogRef.close({data:false});
  }

}
