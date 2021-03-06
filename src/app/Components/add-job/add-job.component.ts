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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

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
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location:Location,
  ) {
    this.addJobForm = FormService.group({
      Description: ['', [Validators.required, Validators.minLength(100)]],
      Location: ['', [Validators.required, Validators.minLength(4)]],
      Requirements: FormService.array([''],[Validators.required]),
      Responsibilities: FormService.array([''],[Validators.required]),
    });
    
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['bg-success', 'text-white'],
      duration: 3000,
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
    console.log(this.NameJob,this.CollectionJob[0].idmthis.IDCareer)
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
     if(!this.Requirements.value.includes('')){
      this.Requirements.push(this.FormService.control('',[Validators.required]));
     }else{
       this.openSnackBar('you must fill this Requirment field first!')
     }
    
  }
  removeRequirment(ReqIndex: number): void {
    this.Requirements.removeAt(ReqIndex);
  }

  addRespons(): void {
    if(!this.Responsibilities.value.includes('')){
      this.Responsibilities.push(this.FormService.control('',[Validators.required]));
    }else{
      this.openSnackBar('you must fill this Respons field first!')
    }
    
  }
  removeRespons(ResIndex: number): void {
    this.Responsibilities.removeAt(ResIndex);
  }
  SubmitJob() {
    let Job: IJob = this.addJobForm.value as IJob;
    console.log(Job)
    this.careerService.addDetailsJob(Job,this.IDCareer,this.JobName)
    this.openSnackBar("Add Successfully!")
    this.restForm();
    this.location.back()   
  }
  UpdateJob(){
    let JobDetails: IJob = this.addJobForm.value as IJob;
    
    this.careerService.UpdateJob(JobDetails,this.NameJob,this.CollectionJob[0].id,this.IDCareer);
    this.openSnackBar("Update Successfully!")
    this.restForm();
    this.location.back()  


  }
  fillJob(JobCollection:IJob){
    console.log(JobCollection.Requirements.length-1)
    for(let i=0; i< JobCollection.Requirements.length-1;i++){
      this.addRequirment()
    }
    for(let i=0; i< JobCollection.Responsibilities.length-1;i++){
      this.addRespons()
    }
      this.addJobForm.setValue({
        Description:JobCollection.Description,
        Location:JobCollection.Location,
        Requirements:JobCollection.Requirements,
        Responsibilities:JobCollection.Responsibilities
      })
      
    
    
    

  }
  restForm(){
    this.addJobForm.reset()
  }
}
