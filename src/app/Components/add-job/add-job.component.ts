import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/ViewModel/job';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  RegisterForm:FormGroup;

  constructor(private FormService:FormBuilder) {
    this.RegisterForm=this.FormService.group({
      Description:['',[Validators.required,Validators.minLength(100)]],
      Location:['',[Validators.required,Validators.minLength(4)]],
      Requirements:this.FormService.array([]),
      Responsibilities:this.FormService.array([])
    })
   }

  ngOnInit(): void {
  }
  get Description(){
    return this.RegisterForm.get('Description')
  }
  get Location(){
    return this.RegisterForm.get('Location')
  }
  get Requirements(){
    return this.RegisterForm.get('Requirements')
  }
  get Responsibilities(){
    return this.RegisterForm.get('Responsibilities')
  }
  submit(){
  
    let Job: Job = this.RegisterForm.value as Job;
    console.log(Job)
  }

}
