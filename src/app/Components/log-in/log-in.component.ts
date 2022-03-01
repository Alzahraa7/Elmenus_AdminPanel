import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
    myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{3,}@[A-za-z]{3,}\.(com|net|edu|org)')]),
      password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z1-9]{6,}')])
    })
    get email(){return this.myForm.get('email')}
    get password(){return this.myForm.get('password')}


    isSignIn = false;
    constructor(private firebaseService: AuthService) { }

  ngOnInit(){
    if(localStorage.getItem('user') !== null)
    this.isSignIn = true
    else
    this.isSignIn = false
  
  }

  async onSubmit(email: string, password: string){
    console.log(this.myForm);
    await this.firebaseService.logIn(email, password)
    if (this.firebaseService.isLogIn)
    this.isSignIn = true

}

handleLogOut(){
  this.isSignIn = false
}

}
