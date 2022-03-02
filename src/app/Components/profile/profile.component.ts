import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z1-9]{3,}@[A-za-z]{3,}\.(com|net|edu|org)')]),
    password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z1-9]{6,}')])
  })
  get name(){return this.myForm.get('name')}
  get email(){return this.myForm.get('email')}
  get password(){return this.myForm.get('password')}

  constructor() { }

  ngOnInit(): void {
  }

}
