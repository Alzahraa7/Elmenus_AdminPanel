import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Career } from 'src/app/ViewModel/career';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css']
})
export class AddCareerComponent implements OnInit {
  RegisterForm:FormGroup;
  JobForm:FormGroup;
 
  constructor(private FormService: FormBuilder,) { 
    this.RegisterForm=this.FormService.group({
      Name:['',[Validators.required,Validators.minLength(4)]],
      Jobs:this.FormService.array([])
    })
    this.JobForm = this.FormService.group({
      Name: ['', [Validators.required,Validators.minLength(6)]],
      Address: ['', [Validators.required,Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
  }
  
  get NameCareer() {
    return this.RegisterForm.get('Name');
  }

  get NameJob(){
    return this.JobForm.get('Name')
  }

  get AddressJob(){
    return this.JobForm.get('Address')
  }

  get Jobs(){
    return this.RegisterForm.controls['Jobs'] as FormArray
  }

  addNewJob():void{
    this.Jobs.push(this.JobForm);
  }
  deleteJob(jobIndex: number) {
    this.Jobs.removeAt(jobIndex);
}
  submit(){
    let Career: Career = this.RegisterForm.value as Career;
    console.log(Career)
  }

}
