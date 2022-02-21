import { Component, OnInit } from '@angular/core';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-list-career',
  templateUrl: './list-career.component.html',
  styleUrls: ['./list-career.component.css']
})
export class ListCareerComponent implements OnInit {

  constructor(private careerService:CareerfirebaseService) { }
  
  ngOnInit(): void {
   
    
  }
  

}
