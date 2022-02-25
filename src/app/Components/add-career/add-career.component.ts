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
import { Career } from 'src/app/ViewModel/career';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css'],
})
export class AddCareerComponent implements OnInit {
  RegisterForm: FormGroup;
  IDCareer:string="";
  UpdateCareer:any
  constructor(
    private FormService: FormBuilder,
    private careerService: CareerfirebaseService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.RegisterForm = this.FormService.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      Jobs: this.FormService.array([], [Validators.required]),
    });
    // this.JobForm = this.FormService.group({
    //   Name: ['', [Validators.required,Validators.minLength(6)]],
    //   Address: ['', [Validators.required,Validators.minLength(5)]],
    // });
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
        console.log("No such document!");
      }
      console.log(this.UpdateCareer)
      this.fillUpdate(this.UpdateCareer)
    }
    )
    
    })

  }

  get NameCareer() {
    return this.RegisterForm.get('Name');
  }

  // get NameJob(){
  //   return this.JobForm.get('Name')
  // }

  // get AddressJob(){
  //   return this.JobForm.get('Address')
  // }

  get Jobs() {
    return this.RegisterForm.get('Jobs') as FormArray;
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

   fillUpdate(Career:Career){
      console.log(Career)
      this.RegisterForm = this.FormService.group({
        Name: [Career.Name, [Validators.required, Validators.minLength(4)]],
        Jobs: this.FormService.array([], [Validators.required]),
      });
     
      
      
  }
  submit() {
    let Career: Career = this.RegisterForm.value as Career;
    this.careerService.addCareer(Career);
    alert('Add Success');
  }
  Update(){
    let Career: Career = this.RegisterForm.value as Career;
    this.careerService.UpdateCareer(Career,this.IDCareer);
  }
}

