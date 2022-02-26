import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';
import { Job } from 'src/app/ViewModel/job';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent implements OnInit {
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
    this.RegisterForm = this.FormService.group({
      Description: ['', [Validators.required, Validators.minLength(100)]],
      Location: ['', [Validators.required, Validators.minLength(4)]],
      Requirements: this.FormService.array([], [Validators.required]),
      Responsibilities: this.FormService.array([], [Validators.required]),
    });
    // this.Require = this.RegisterForm.controls
    // console.log(this.Require.Requirements.controls)
    // this.Requires = this.Require.Requirements.controls
    // console.log(this.Requires)
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
        console.log(this.CollectionJob[0])
        this.RegisterForm = this.FormService.group({
          Description: [this.CollectionJob[0].Description],
          Location: [this.CollectionJob[0].Location],
          Requirements: this.FormService.array([this.CollectionJob.Requirements], [Validators.required]),
          Responsibilities: this.FormService.array([this.CollectionJob.Responsibilities], [Validators.required]),
        });
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
  get Requirement(): any {
    return this.FormService.group({
      Requirement: this.FormService.control('', [Validators.required]),
    });
  }
  get Respons(): any {
    return this.FormService.group({
      Respons: this.FormService.control('', [Validators.required]),
    });
  }
  addRequirment(): void {
    this.Requirements.push(this.Requirement);
  }
  removeRequirment(ReqIndex: number): void {
    this.Requirements.removeAt(ReqIndex);
  }

  addRespons(): void {
    this.Responsibilities.push(this.Respons);
  }
  removeRespons(ResIndex: number): void {
    this.Responsibilities.removeAt(ResIndex);
  }
  submit() {
    let Job: Job = this.RegisterForm.value as Job;
    console.log(Job)
     this.careerService.addDetailsJob(Job,this.IDCareer,this.JobName)
  }
  Update(){
    let JobDetails: Job = this.RegisterForm.value as Job;
    this.careerService.UpdateJob(JobDetails,this.NameJob,this.CollectionJob.id);

  }
}
