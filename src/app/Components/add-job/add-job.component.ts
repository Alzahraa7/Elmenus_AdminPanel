import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';
import { IJob } from 'src/app/Model/ijob';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent implements OnInit {
  @ViewChild('ReqInput') ReqInput !:ElementRef;
  addJobForm: FormGroup;
  IDCareer:string="";
  JobName:string=""
  Require:any;
  Requires:any
  NameJob:string=""
  CollectionJob:any
  constructor(
    private FormService: FormBuilder,
    private careerService: CareerfirebaseService,
    private activeRoute: ActivatedRoute
  ) {
    this.addJobForm = FormService.group({
      Description: ['', [Validators.required, Validators.minLength(100)]],
      Location: ['', [Validators.required, Validators.minLength(4)]],
      Requirements: FormService.array([''],[Validators.required]),
      Responsibilities: FormService.array([''],[Validators.required]),
    });
    
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.IDCareer = String(paramMap.get('id'));
      this.JobName = String(paramMap.get('Name'))
      console.log(this.IDCareer,this.JobName);
    });
  
    this.activeRoute.paramMap.subscribe((paramMap)=>{
      this.NameJob=String(paramMap.get('NameJob'));
      this.careerService.getJobID(this.NameJob).subscribe((job:IJob)=>{
        this.CollectionJob= job
        console.log(this.CollectionJob[0].Responsibilities)
        this.fillJob(this.CollectionJob[0])
      
      })
      

    });
  }
  
  get Description() {
    return this.addJobForm.get('Description');
  }
  get Location() {
    return this.addJobForm.get('Location');
  }
  get Requirements() {
    return this.addJobForm.get('Requirements') as FormArray;
  }
  get Responsibilities() {
    return this.addJobForm.get('Responsibilities') as FormArray;
  }

  addRequirment(): void {
      this.Requirements.push(this.FormService.control('',[Validators.required]));
    
  }
  removeRequirment(ReqIndex: number): void {
    this.Requirements.removeAt(ReqIndex);
  }

  addRespons(): void {
    this.Responsibilities.push(this.FormService.control('',[Validators.required]));
  }
  removeRespons(ResIndex: number): void {
    this.Responsibilities.removeAt(ResIndex);
  }
  SubmitJob() {
    let Job: IJob = this.addJobForm.value as IJob;
    console.log(Job)
    this.careerService.addDetailsJob(Job,this.IDCareer,this.JobName)
    alert("Add Successfully!")
    this.restForm();
  }
  UpdateJob(){
    let JobDetails: IJob = this.addJobForm.value as IJob;
    this.careerService.UpdateJob(JobDetails,this.NameJob,this.CollectionJob.id);
    alert("Update Successfully!")
    this.restForm();

  }
  fillJob(JobCollection:IJob){
    this.addJobForm.setValue({
      Description:JobCollection.Description,
      Location:JobCollection.Location,
      Requirements:[JobCollection.Requirements],
      Responsibilities:[JobCollection.Responsibilities]
    })

  }
  restForm(){
    this.addJobForm.reset()
  }
}
