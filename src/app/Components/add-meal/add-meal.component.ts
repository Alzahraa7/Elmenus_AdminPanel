import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMeal } from 'src/app/Model/meal';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  addMealForm: FormGroup;
  constructor(private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.addMealForm = FormService.group({
        Description:['', [Validators.required, Validators.minLength(10)]],
        ProName: ['', [Validators.required,Validators.minLength(5)]],
        ProImg:['',[Validators.required]],
        Size: FormService.array([],[Validators.required]),
        Extras:FormService.array([],[Validators.required]),
      });
     }

  ngOnInit(): void {
  }
  get Description(){
    return this.addMealForm.get('Description');
  }
  get ProName(){
    return this.addMealForm.get('ProName');
  }
  get ProImg(){
    return this.addMealForm.get('ProImg');
  }
  get Size(){
    return this.addMealForm.get('Size') as FormArray;
  }
  get Extras(){
    return this.addMealForm.get('Extras') as FormArray;
  }

  get size(): any {
    return this.FormService.group({
      Name: this.FormService.control('', [Validators.required]),
      Price:this.FormService.control('', [Validators.required]),
    });
  }
  addNewSize(): void {
    this.Size.push(this.size);
  }
  removeSize(sizeIndex: number) {
    this.Size.removeAt(sizeIndex);
  }
  get extra(): any {
    return this.FormService.group({
      Name: this.FormService.control('', [Validators.required]),
      Price:this.FormService.control('', [Validators.required]),
    });
  }
  addNewExtra(): void {
    this.Extras.push(this.extra);
  }
  removeExtra(extraIndex: number) {
    this.Extras.removeAt(extraIndex);
  }
  SubmitMeal(){
    let Meal: IMeal = this.addMealForm.value as IMeal;
    console.log(Meal)
  }

}
