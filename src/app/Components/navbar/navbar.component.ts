import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogged!: boolean;
  user: any;
  navUser: string;
  @Output() isLogOut = new EventEmitter<void>()

  constructor(public firebaseService: AuthService) {
    
    this.user = localStorage.getItem('email')
     console.log("from Nav" + this.user);
    this.navUser = this.user?.slice(1).split("@")[0];
    this.navUser = this.navUser[0].toUpperCase() + this.navUser?.slice(1);
    
  }

  ngOnInit(): void {

    this.firebaseService.getloggedStatus().subscribe(status=>{
      this.isUserLogged=status;
      console.log(this.isUserLogged);
    });
  }

  logOut(){
    this.firebaseService.logOut()
    this.isLogOut.emit()
  }

}
