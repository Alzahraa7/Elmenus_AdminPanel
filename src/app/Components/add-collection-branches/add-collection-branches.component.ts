import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBranches } from 'src/app/Model/branches';
@Component({
  selector: 'app-add-collection-branches',
  templateUrl: './add-collection-branches.component.html',
  styleUrls: ['./add-collection-branches.component.css']
})
export class AddCollectionBranchesComponent implements OnInit {
  RegisterForm: FormGroup;
  constructor(private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) { 

      this.RegisterForm = this.FormService.group({
        LocName:['', [Validators.required, Validators.minLength(4)]],
        Address: ['', [Validators.required, Validators.minLength(10)]],
        Workinghours:['',[Validators.required,Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9](( )(AM||PM))(( )-( ))([0-1]?[0-9]|2[0-3]):[0-5][0-9](( )(AM||PM))$')]]
      });

  }

  ngOnInit(): void {
  }
  get LocName(){
    return this.RegisterForm.get('LocName');
  }
  get Address(){
    return this.RegisterForm.get('Address');
  }
  get Workinghours(){
    return this.RegisterForm.get('Workinghours');
  }

  Submit(){
    let Branch: IBranches = this.RegisterForm.value as IBranches;
    console.log(Branch)
  }

}
