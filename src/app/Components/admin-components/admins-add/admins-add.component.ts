import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin.service';
import { IAdmin } from 'src/app/Model/admin';

@Component({
  selector: 'app-admins-add',
  templateUrl: './admins-add.component.html',
  styleUrls: ['./admins-add.component.css']
})
export class AdminsAddComponent implements OnInit {
  invalid:any
  admin:IAdmin={
    adminName:"",
    adminEmail:"",
    adminPassword:"",
  }
  constructor(private adminService:AdminService) { }

  ngOnInit() {
  }

  onSubmit(){

    if(this.admin.adminEmail !="" && this.admin.adminName !="" && this.admin.adminPassword !="") {
      this.adminService.addAdmin(this.admin);
      this.admin.adminName = "";
      this.admin.adminEmail = "";
      this.admin.adminPassword = "";
    }
  
  }

}
