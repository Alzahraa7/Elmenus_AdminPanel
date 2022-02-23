import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css']
})
export class AddCareerComponent implements OnInit {
  RegisterForm:FormGroup;
  constructor(private FromService: FormBuilder,) { 
    this.RegisterForm=FromService.group({
      Name:['',[Validators.required]],
      Jobs:FromService.array([this.FromService.control(FromService.group({
        Name: ['',[Validators.required]],
        Address: ['',[Validators.required]],
      }))],[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  get Name() {
    return this.RegisterForm.get('Name');
  }
  get Jobs(){
    return this.RegisterForm.get('Jobs') as FormArray
  }

}
