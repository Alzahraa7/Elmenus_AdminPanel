import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOffers } from 'src/app/Model/offers';
@Component({
  selector: 'app-add-collection-offers',
  templateUrl: './add-collection-offers.component.html',
  styleUrls: ['./add-collection-offers.component.css']
})
export class AddCollectionOffersComponent implements OnInit {
  RegisterForm: FormGroup;
  constructor(private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) { 
      this.RegisterForm = this.FormService.group({
        Description:['', [Validators.required, Validators.minLength(10)]],
        Expires: ['', [Validators.required]],
        PromoCode:['',[Validators.required,Validators.minLength(5)]]
      });
    }

  ngOnInit(): void {
  }
  get Description(){
    return this.RegisterForm.get('Description');
  }
  get Expires(){
    return this.RegisterForm.get('Expires');
  }
  get PromoCode(){
    return this.RegisterForm.get('PromoCode');
  }

  Submit(){
    let Offer: IOffers = this.RegisterForm.value as IOffers;
    console.log(Offer)
  }

}
