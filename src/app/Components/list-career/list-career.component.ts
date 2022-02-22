import { Component, OnInit } from '@angular/core';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-list-career',
  templateUrl: './list-career.component.html',
  styleUrls: ['./list-career.component.css']
})
export class ListCareerComponent implements OnInit {
   Careers:any;
  constructor(private careerService:CareerfirebaseService) { }
  
  ngOnInit(): void {
    this.careerService.getAll().subscribe((career: any)=>{
      console.log(career)
    this.Careers = career
    })

    this.careerService.getJobs().subscribe((job:any)=>{
      console.log(job)
    })
  }
  

}
