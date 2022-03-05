import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';
import { ICareer } from 'src/app/Model/icareer'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css'],
})
export class AddCareerComponent implements OnInit {
  addCareerForm: FormGroup;
  IDCareer:string="";
  UpdateCareer:ICareer|any
  constructor(
    private FormService: FormBuilder,
    private careerService: CareerfirebaseService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.addCareerForm = this.FormService.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      Jobs: this.FormService.array([], [Validators.required]),
    });
    // this.JobForm = this.FormService.group({
    //   Name: ['', [Validators.required,Validators.minLength(6)]],
    //   Address: ['', [Validators.required,Validators.minLength(5)]],
    // });
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
    this.activeRoute.paramMap.subscribe((paramMap)=>{
      this.IDCareer=String(paramMap.get('id'));
      console.log(this.IDCareer)
      
    this.careerService.getCareerByID(this.IDCareer).then((doc) => {
      if (doc.exists) {
        this.UpdateCareer=doc.data()
        console.log("Document data:", doc.data());
      } else {
        this.openSnackBar("No such document!");
      }
      console.log(this.UpdateCareer)
      this.fillUpdate(this.UpdateCareer)
    }
    )
    
    })

  }

  get NameCareer() {
    return this.addCareerForm.get('Name');
  }

  // get NameJob(){
  //   return this.JobForm.get('Name')
  // }

  // get AddressJob(){
  //   return this.JobForm.get('Address')
  // }

  get Jobs() {
    return this.addCareerForm.get('Jobs') as FormArray;
  }
  get Job(): any {
    
    return this.FormService.group({
      Name: this.FormService.control('', [Validators.required]),
      Address: this.FormService.control('', [Validators.required]),
    });
  }
  addNewJob(): void {
    this.Jobs.push(this.Job);
  }
  removeJob(jobIndex: number) {
    this.Jobs.removeAt(jobIndex);
  }

   fillUpdate(Career:ICareer){
      console.log(Career)
      Career.Jobs?.map((job)=>{
        console.log(job.Name)
      })
      console.log(Career.Jobs)
      this.addCareerForm = this.FormService.group({
        Name: [Career.Name, [Validators.required, Validators.minLength(4)]],
        Jobs: this.FormService.array([
            this.FormService.group({
              Name: this.FormService.control(Career.Jobs?.[0].Name, [Validators.required]),
              Address: this.FormService.control(Career.Jobs?.[0].Address, [Validators.required]),
               }) 
              ]),
      });
     
      
      
  }
  SubmitDepartment() {
    let Career: ICareer = this.addCareerForm.value as ICareer;
    this.careerService.addCareer(Career);
    this.openSnackBar('Add Success');
    this.restForm()
  }
  UpdateDepartment(){
    let Career: ICareer = this.addCareerForm.value as ICareer;
    this.careerService.UpdateCareer(Career,this.IDCareer);
    this.openSnackBar('Update Scucess')
    this.restForm()
  }
  restForm(){
    this.addCareerForm.reset()
  }
}


