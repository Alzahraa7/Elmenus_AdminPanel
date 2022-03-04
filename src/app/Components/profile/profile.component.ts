import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { IAdmin } from 'src/app/Model/IAdmin';
import { AuthService } from 'src/app/Service/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  admins!: IAdmin[];
  adminToEdit!: IAdmin;

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z1-9]{3,}@[A-za-z]{3,}\.(com|net|edu|org)')]),
    password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z1-9]{5,}')]),

  })
  get name(){return this.editForm.get('name')}
  get email(){return this.editForm.get('email')}
  get password(){return this.editForm.get('password')}

  


  userEmail: any;
  
  constructor(private firebaseService: AuthService) { 
    this.firebaseService.getAdmins().subscribe(admins =>{
      console.log(admins);
      this.admins = admins;

    this.userEmail = localStorage.getItem('email')?.slice(1,-1);
    // console.log('from profile  '+ this.userEmail);

      for(let admin of admins){
        // console.log("this is admin data "+admin.adminName);
        // console.log("this is admin data "+admin.adminEmail);
        // console.log("this is admin data "+admin.adminPassword);
        if(admin.adminEmail === this.userEmail){
          this.editForm.setValue({
            name : admin.adminName,
            email: admin.adminEmail,
            password: admin.adminPassword,
          })
        }       
      }     
    })
  }

  disableForm: boolean = true;

  editAdminBtn(event: any, admin: IAdmin){
    this.disableForm = false;
    this.adminToEdit = admin;
  }

  updateAdmin(admin: IAdmin){
    this.firebaseService.updateAdmin(admin);
    this.disableForm = true;

  }
  

  ngOnInit(): void {}

}
