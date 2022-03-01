import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() isLogOut = new EventEmitter<void>()
  constructor(public firebaseService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.firebaseService.logOut()
    this.isLogOut.emit()
  }

}
