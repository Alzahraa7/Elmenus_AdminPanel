import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin.service';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAdmin } from 'src/app/Model/admin';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admins-add',
  templateUrl: './admins-add.component.html',
  styleUrls: ['./admins-add.component.css']
})


export class AdminsAddComponent implements OnInit {

  addAdminForm: FormGroup;
  paramAdminID:any
  fetchedAdmin:any

  constructor(
    private activatedRoute:ActivatedRoute,
    private FormService: FormBuilder,
    private adminService:AdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
             )

  {

    this.addAdminForm = this.FormService.group({
      adminName: ['', [Validators.required,Validators.minLength(3)]],
      adminEmail:['',[Validators.required,Validators.email]],
      adminPassword:['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,}$")]],
     
    });

    activatedRoute.paramMap.subscribe((paramMap) => {

      this.paramAdminID = paramMap.get('name');

      this.fetchedAdmin = adminService.getAdmin(this.paramAdminID).subscribe((res)=>{
        
        this.adminName?.setValue(res.adminName)
        this.adminEmail?.setValue(res.adminEmail)
        this.adminPassword?.setValue(res.adminPassword)
      });
      
    })



  }

  ngOnInit() {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,"",{
      horizontalPosition:"center",
      verticalPosition:"bottom",
      panelClass:['bg-success','text-white'],
      duration:2000
    });
  }

  get adminName(){
    return this.addAdminForm.get('adminName');
  }
  get adminEmail(){
    return this.addAdminForm.get('adminEmail');
  }
  get adminPassword(){
    return this.addAdminForm.get('adminPassword');
  }


  onUpdate(){
    let dialogRef = this.dialog.open(CustomDialogComponent,{
      data:{mess:`Are you sure you want to save these changes ?`}
    });

    dialogRef.afterClosed().subscribe(i=>{
      if(i.data){
       
        console.log(typeof this.adminName?.value)
        console.log(typeof this.adminEmail?.value)
        console.log(typeof this.adminPassword?.value)
        this.adminService.updateAdmin(this.adminName?.value,this.adminEmail?.value,this.adminPassword?.value,this.paramAdminID);
        this.openSnackBar(`Admin successfuly updated !`)
      }
    })
  }


  onSubmitAdmin(){

    let newAdmin: IAdmin = this.addAdminForm.value as IAdmin;
    
    let dialogRef = this.dialog.open(CustomDialogComponent,{
      data:{mess:`Are you sure you want to add this Admin ?`}
    });

  
    
    dialogRef.afterClosed().subscribe(i=>{
      if(i.data){
       
        this.adminService.addAdmin(newAdmin);
        this.openSnackBar(`You have successfuly add new Admin !`)
      }
    })
    
  }

}
