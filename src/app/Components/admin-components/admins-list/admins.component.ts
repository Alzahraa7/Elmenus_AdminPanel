import { Component, OnInit } from '@angular/core';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { IAdmin } from 'src/app/Model/admin';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css','../../table/table.component.css']
})
export class AdminsComponent implements OnInit {

  admins!: IAdmin[];

  faDelete = faTrash;
  faEdit = faEdit;
  
  constructor(private adminService:AdminService) { 

  }

  ngOnInit() {
    this.adminService.getAdmins().subscribe((admin:any) =>{
      
      this.admins = admin;
      console.log( this.admins)
    });
  }

  deleteAdminBtn(adminPushID:string,adminName:string) {
    if(confirm("Do you want permanently remove this Admin ?  ")) {

      this.adminService.deleteAdmin(adminPushID)
      
    }
  }

  editAdminBtn(adminPushID:string,adminName:string) {

  }

}
