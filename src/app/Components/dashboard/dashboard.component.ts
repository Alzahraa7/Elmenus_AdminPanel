import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor( public analytics:AngularFireAnalytics) {
  }
  ngAfterViewInit(): void {
     const an = this.analytics.logEvent(
      'login',
      {
      }
    )
    console.log(an.then(i=>console.log(i)))
  }

  ngOnInit(): void {
  }

}
