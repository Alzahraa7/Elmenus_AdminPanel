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
   index2:number=0;
  constructor(private careerService:CareerfirebaseService) { }
  
  ngOnInit(): void {
    this.careerService.getAll().subscribe((career: any)=>{
      console.log(career[0])
    this.Careers = career
    })

    this.careerService.getJobs().subscribe((job:any)=>{
      console.log(job)
    })
  }
  saveValue(event:any){
       console.log(event.target.value)
       this.index2=event.target.value;  
  }
  

}
