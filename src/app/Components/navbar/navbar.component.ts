import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/Service/side-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

                  //SIDE BAR SERVICE
  constructor(private sidebar:SideBarService) { }
  

  //SIDE BAR FUNCTION
  toggleActive:boolean = false;

	toggleSideBar() {
		this.toggleActive = !this.toggleActive;
		this.sidebar.toggle();

    console.log('Clicked');
	}
	

  ngOnInit(): void {
  }

}
