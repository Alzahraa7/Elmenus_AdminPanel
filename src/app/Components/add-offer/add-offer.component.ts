
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IOffers } from 'src/app/Model/offers';
import { OffersService } from 'src/app/Service/offers.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  offers!: IOffers[];
  paramResId:any;
  submit:boolean=true
  addOfferForm: FormGroup;

  @Output()submittedOfr : EventEmitter<boolean>;
  
  @Input() clickAddOffer:boolean = true;
  constructor( 
    private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private offersService:OffersService) 
    {
      this.addOfferForm = this.FormService.group({
        Description:['', [Validators.required, Validators.minLength(10)]],
        Expires: ['', [Validators.required]],
        PromoCode:['',[Validators.required,Validators.minLength(5)]]
      });

      this.paramResId = activeRoute.snapshot.paramMap.get('id');

      this.submittedOfr = new EventEmitter<boolean> ();
     }

  ngOnInit() {

    this.offersService.getOffers( this.paramResId).subscribe((res:any) =>{
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

  openSnackBar(message: string) {
    this._snackBar.open(message,"",{
      horizontalPosition:"end",
      verticalPosition:"top",
      panelClass:['bg-success','text-white'],
      duration:2000
    });
  }

  SubmitOffer(){
    let newOffer: IOffers = this.addOfferForm.value as IOffers;
    console.log(newOffer)
    this.offersService.addOffer(newOffer,this.paramResId)
    this.addOfferForm.reset()

    this.clickAddOffer =false;

    this.openSnackBar(`You have added new Offer`);
    this.submittedOfr.emit(this.submit);

  }




  

}
