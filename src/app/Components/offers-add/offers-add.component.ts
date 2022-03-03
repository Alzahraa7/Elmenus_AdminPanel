import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOffers } from 'src/app/Model/offers';
import { OffersService } from 'src/app/Service/offers.service';

@Component({
  selector: 'app-offers-add',
  templateUrl: './offers-add.component.html',
  styleUrls: ['./offers-add.component.css']
})
export class OffersAddComponent implements OnInit {

  offers!: IOffers[];
  paramResId:any;

  addOfferForm: FormGroup;
  constructor(
    private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private offersService:OffersService) {
      this.addOfferForm = this.FormService.group({
        Description:['', [Validators.required, Validators.minLength(10)]],
        Expires: ['', [Validators.required]],
        PromoCode:['',[Validators.required,Validators.minLength(5)]]
      });

      activeRoute.paramMap.subscribe((paramMap) => {

        this.paramResId = paramMap.get('name');
        
      })


      
    }

  ngOnInit() {

   this.offersService.getOffers().subscribe((res:any) =>{
    this.offers = res;
    console.log(this.offers)
   })
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
    let newOffer: IOffers = this.addOfferForm.value as IOffers;
    console.log(newOffer)

    this.offersService.addOffer(newOffer,this.paramResId)

  }

}
