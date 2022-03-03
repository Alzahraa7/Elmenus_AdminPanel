import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOffers } from 'src/app/Model/offers';

@Component({
  selector: 'app-offers-add',
  templateUrl: './offers-add.component.html',
  styleUrls: ['./offers-add.component.css']
})
export class OffersAddComponent implements OnInit {

  addOfferForm: FormGroup;
  constructor(
    private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.addOfferForm = this.FormService.group({
        Description:['', [Validators.required, Validators.minLength(10)]],
        Expires: ['', [Validators.required]],
        PromoCode:['',[Validators.required,Validators.minLength(5)]]
      });
    }

  ngOnInit() {
  }

  get Description(){
    return this.addOfferForm.get('Description');
  }
  get Expires(){
    return this.addOfferForm.get('Expires');
  }
  get PromoCode(){
    return this.addOfferForm.get('PromoCode');
  }

  SubmitOffer(){
    let Offer: IOffers = this.addOfferForm.value as IOffers;
    console.log(Offer)
  }

}
