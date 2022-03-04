import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenuCat } from 'src/app/Model/menu';
import { MenuService } from 'src/app/Service/menu.service';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
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
  ImgSelect:any ;
  ImgSelectedSrc: string = "assets/click.webp";
  constructor(private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private MenuService:MenuService,
    private _snackBar: MatSnackBar,
    private location:Location,
    private storage: AngularFireStorage) {
      this.addMealForm = FormService.group({
        Description:['', [Validators.required, Validators.minLength(10)]],
        ProName: ['', [Validators.required,Validators.minLength(5)]],
        ProImg:['',[Validators.required]],
        Size: FormService.array([],[Validators.required]),
        Extras:FormService.array([],[Validators.required]),
      });
     }
     openSnaker(message:string){
      this._snackBar.open(message,"",{
        horizontalPosition:"center",
        verticalPosition:"top",
        panelClass:['bg-success','text-white'],
        duration:2000
      });
    }

  ngOnInit(): void {
    
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.IDMenu = String(paramMap.get('idRes'));
      this.IDRest = String(paramMap.get('idMen'));
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
  ShowSrcImage(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.ImgSelectedSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.ImgSelect = event.target.files[0]
    }
    else{
      this.ImgSelectedSrc = 'assets/click.webp';
      this.ImgSelect = null;
    }
  }

  SubmitMeal(){
    let NEWMeal: IMenuCat = this.addMealForm.value as IMenuCat;
    
    this.location.back()
    var filePath = `ResImges/${NEWMeal.ProName}/${this.ImgSelect.name}_${new Date().getTime()}`
    var filrRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.ImgSelect).snapshotChanges().pipe(
      finalize(()=>{
        filrRef.getDownloadURL().subscribe((url)=>{
          NEWMeal.ProImg = url;
          this.MenuService.addMeal(NEWMeal,this.IDRest,this.IDMenu,this.NameMenuColl);
          this.openSnaker("Add Meal Successfully!");
          this.restForm();
        })
      })
    ).subscribe();



  }
 
  restForm(){
    this.addMealForm.reset()
  }
  

}
