import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
        Workinghours:['',[Validators.required,Validators.minLength(12)]]
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

}
