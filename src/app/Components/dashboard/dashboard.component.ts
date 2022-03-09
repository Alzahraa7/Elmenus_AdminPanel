import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { DashboardService } from 'src/app/Service/dashboard.service';
import {faBurger,faCity,faFileSignature} from '@fortawesome/free-solid-svg-icons'
import {faUsers} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  RestCountConfirmed:number=0;
  RestCountNotConf:number=0;
  UserCount:number=0;
  cityCount:number=0;
  careerCount:number=0;
  faRestIcon=faBurger;
  faUserIcon=faUsers;
  faCityIcon=faCity;
  faCareericon=faFileSignature;
  constructor(private dashSrvs:DashboardService) {
  }

  ngOnInit(): void {
    this.dashSrvs.getRestaurantCount().subscribe(i=>{
      let counter =0;
      i.map((i:any)=>{
        if(i.IsActivated){
          counter++;
        }
      })
      this.RestCountConfirmed = counter;
    })
    this.dashSrvs.getRestaurantCount().subscribe(i=>{
      let counter =0;
      i.map((i:any)=>{
        if(i.IsActivated == false){
          counter++;
        }
      })
      this.RestCountNotConf = counter;
    })
    this.dashSrvs.getUserCount().subscribe(i=>{
      this.UserCount = i.size;
    })
    this.dashSrvs.getCities().subscribe(i=>{
      this.cityCount = i.size;
    })
    this.dashSrvs.getCareersCount().subscribe(i=>{
      this.careerCount = i.size;
    })
  }

}
