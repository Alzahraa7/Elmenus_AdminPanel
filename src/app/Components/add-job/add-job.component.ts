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
  RegisterForm: FormGroup;
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
    this.RegisterForm = FormService.group({
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
      this.careerService.getJobID(this.NameJob).subscribe((job:any)=>{
        this.CollectionJob= job
        console.log(this.CollectionJob[0].Responsibilities)
        this.RegisterForm.setValue({
          Description:this.CollectionJob[0].Description,
          Location:this.CollectionJob[0].Location,
          Requirements:[this.CollectionJob[0].Requirements],
          Responsibilities:[this.CollectionJob[0].Responsibilities]
        })
      })
      

    });
  }
  
  get Description() {
    return this.RegisterForm.get('Description');
  }
  get Location() {
    return this.RegisterForm.get('Location');
  }
  get Requirements() {
    return this.RegisterForm.get('Requirements') as FormArray;
  }
  get Responsibilities() {
    return this.RegisterForm.get('Responsibilities') as FormArray;
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
  submit() {
    let Job: IJob = this.RegisterForm.value as IJob;
    console.log(Job)
    this.careerService.addDetailsJob(Job,this.IDCareer,this.JobName)
    alert("Add Successfully!")
    this.restForm();
  }
  Update(){
    let JobDetails: IJob = this.RegisterForm.value as IJob;
    this.careerService.UpdateJob(JobDetails,this.NameJob,this.CollectionJob.id);
    alert("Update Successfully!")
    this.restForm();

  }
  restForm(){
    this.RegisterForm.reset()
  }
}
