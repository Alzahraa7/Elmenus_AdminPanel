import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJob } from 'src/app/Model/ijob';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  NameJob:string="";
  Job:IJob[]|undefined
  constructor(private activeRoute:ActivatedRoute,
    private careerService:CareerfirebaseService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap)=>{
      this.NameJob=String(paramMap.get('Name'));
      this.careerService.getJobID(this.NameJob).subscribe((job:any)=>{
        this.Job= job
      })
      

    });
  }

}
