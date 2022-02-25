import { Component, OnInit } from '@angular/core';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';
import { map } from 'rxjs';
import { faCoffee,faTrashAlt,faEdit,faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-career',
  templateUrl: './list-career.component.html',
  styleUrls: ['./list-career.component.css']
})
export class ListCareerComponent implements OnInit {
   Careers:any;
   index2:number=0;
   faCoffee = faCoffee;
   faTrash=faTrashAlt;
   faEdit=faEdit;
   faCirclePlus=faCirclePlus;
  constructor(private careerService:CareerfirebaseService,private router:Router,) { }
  
  ngOnInit(): void {
    this.careerService.getAll().subscribe((career: any)=>{
      console.log(career[0].id)
      this.Careers = career
    
    })
   
    
    this.careerService.getJobs().subscribe((job:any)=>{
      console.log(job[0].id)
    })
  }
  saveValue(event:any){
      //  console.log(event.target.value)
       this.index2=event.target.value;  
  }
  Edit(i:number,index2:number){
  // console.log(i);
  // console.log(index2)


  }
  deleteJob(event:any,job:any,Career:any){
    this.careerService.deleteJob(job,Career)
    console.log(Career);

  }
  deleteCareer(Career:any){
    this.careerService.deleteCareer(Career)
  }
  
  addCareer(){
    this.router.navigate(['\addCareer'])
  }
JobDetails(jobName:string){
 console.log(jobName);
 this.careerService.getJobID(jobName).subscribe((job:any)=>{
  const d = job
  console.log(d[0])
})
this.router.navigate(['\JobDetails',jobName])

}
EditCareer(idCareer:string){
    console.log(idCareer)
     this.router.navigate(['\addCareer',idCareer])
}
AddJobDetails(id:string,JobName:string){
  console.log(id,JobName)
  this.router.navigate(['\addJob',id,JobName])
}
}
