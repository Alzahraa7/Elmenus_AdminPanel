import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { IAdmin } from 'src/app/Model/admin';
import { AdminService } from 'src/app/Service/admin.service';
import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css','../../table/table.component.css']
})
export class AdminsComponent implements OnInit {

  admins!: IAdmin[];

  faDelete = faTrash;
  faEdit = faEdit;
  
  constructor(private adminService:AdminService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,) { 

  }

  ngOnInit() {
    this.adminService.getAdmins().subscribe((admin:any) =>{
      
      this.admins = admin;
      console.log( this.admins)
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,"",{
      horizontalPosition:"center",
      verticalPosition:"bottom",
      panelClass:['bg-success','text-white'],
      duration:2000
    });
  }

  deleteAdminBtn(adminPushID:string,adminName:string) {

    
    let dialogRef = this.dialog.open(CustomDialogComponent,{
      data:{mess:`Are you sure you want to delete this Admin ?`}
    });
    
    dialogRef.afterClosed().subscribe(i=>{
      if(i.data){
      
        this.adminService.deleteAdmin(adminPushID)     
        this.openSnackBar(`Admin successfuly deleted !`)
      }
    })
  }

  editAdminBtn(adminPushID:string,adminName:string) {
  }

}
