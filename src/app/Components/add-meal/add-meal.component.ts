import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenuCat } from 'src/app/Model/menu';
import { MenuService } from 'src/app/Service/menu.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {

  addMealForm: FormGroup;
  IDRest:string="";
  IDMenu:string="";
  NameMenuColl:string="";
  constructor(private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private MenuService:MenuService) {
      this.addMealForm = FormService.group({
        Description:['', [Validators.required, Validators.minLength(10)]],
        ProName: ['', [Validators.required,Validators.minLength(5)]],
        ProImg:['',[Validators.required]],
        Size: FormService.array([],[Validators.required]),
        Extras:FormService.array([],[Validators.required]),
      });
     }

  ngOnInit(): void {
    
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.IDRest = String(paramMap.get('idRes'));
      this.IDMenu = String(paramMap.get('idMen'));
      this.NameMenuColl = String(paramMap.get('NameColl'))
      console.log(this.IDRest,this.IDMenu,this.NameMenuColl);
    });
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
    let Meal: IMenuCat = this.addMealForm.value as IMenuCat;
    this.MenuService.addMeal(Meal,this.IDRest,this.IDMenu,this.NameMenuColl);
    alert("Add success");
    this.restForm();
  }
  restForm(){
    this.addMealForm.reset()
  }

}
