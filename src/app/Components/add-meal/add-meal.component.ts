import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  RegisterForm: FormGroup;
  constructor(private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.RegisterForm = this.FormService.group({
        Description:['', [Validators.required, Validators.minLength(6)]],
        ProName: ['', [Validators.required,Validators.minLength(5)]],
        ProImg:['',[Validators.required]],
        Size: this.FormService.array(['',[Validators.required]]),
        Extras:this.FormService.array(['',[Validators.required]]),
      });
     }

  ngOnInit(): void {
  }

}
