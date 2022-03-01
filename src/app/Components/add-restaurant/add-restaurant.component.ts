import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { IRestaurant } from 'src/app/Model/irestaurant';
import { RestaurantService } from 'src/app/Service/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  addResForm: FormGroup;
  imgageSelectedSrc: string = "assets/click.webp";
  logoSelectedSrc: string = "assets/click.webp";
  selectedImage:any = null;
  selectedLogo:any;
  @ViewChild('moodInput') moodInput !: ElementRef;
  @ViewChild('typeInput') typeInput !: ElementRef;

  constructor(private fb: FormBuilder, private RestaurantServer: RestaurantService, private storage: AngularFireStorage) {

    this.addResForm = fb.group({
      ResName: ['', [Validators.required, Validators.minLength(3)]],
      ImageLogo: ['', [Validators.required]],
      ImageURL: ['', [Validators.required]],
      OwnerName: ['', [Validators.required]],
      Rate: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      IsActivated: new FormControl(true),
      Mood: fb.array(['']),
      Type: fb.array([''])
    })
   }


   get ResName(){
     return this.addResForm.get('ResName');
   }
   get ImageLogo(){
    return this.addResForm.get('ImageLogo');
  }
  get ImageURL(){
    return this.addResForm.get('ImageURL');
  }
  get OwnerName(){
    return this.addResForm.get('OwnerName');
  }
  get Rate(){
    return this.addResForm.get('Rate');
  }
  get Mood(){
    return this.addResForm.get('Mood') as FormArray;
  }
  get Phone(){
    return this.addResForm.get('Phone');
  }
  get Type(){
    return this.addResForm.get('Type')  as FormArray;
  }

  addRestaurant(){
    
    let newRestaurant : IRestaurant = this.addResForm.value as IRestaurant;
    
    //add images into storage
    var filePath = `ResImges/${newRestaurant.ResName}/${this.selectedImage.name}_${new Date().getTime()}`
    var filrRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        filrRef.getDownloadURL().subscribe((url)=>{
          newRestaurant.ImageURL = url;

          var logopath = `ResImges/${newRestaurant.ResName}/${this.selectedLogo.name}_${new Date().getTime()}`
          var logoRef = this.storage.ref(logopath);
          this.storage.upload(logopath, this.selectedLogo).snapshotChanges().pipe(
            finalize(()=>{
              logoRef.getDownloadURL().subscribe((url)=>{
                newRestaurant.ImageLogo = url;
                console.log(newRestaurant.ImageLogo);
                this.RestaurantServer.addRestaurant(newRestaurant);
                alert("added")
                this.resetForm();
              })
            })
          ).subscribe();
      

        })
      })
    ).subscribe();

 
    //add restaurant into server
  


  }

  resetForm(){
    this.addResForm.reset();
    this.addResForm.setValue({
      ResName: '',
      ImageLogo: '',
      ImageURL: '',
      OwnerName: '',
      Rate: '',
      Phone: '',
      IsActivated: new FormControl(true),
      Mood: '',
      Type: ''
    })
    this.imgageSelectedSrc = "assets/click.webp";
    this.logoSelectedSrc = "assets/click.webp";
    this.selectedImage = null;
    this.selectedLogo = null;
  }

  addMood(){
    // console.log()
    if(this.moodInput.nativeElement.value){
      this.Mood.push(this.fb.control(''));
    }
  }
  deleteMood(index:number){
    this.Mood.removeAt(index)
  }

  addType(){
    // console.log()
    if(this.typeInput.nativeElement.value){
      this.Type.push(this.fb.control(''));
    }
  }
  deleteType(index:number){
    this.Type.removeAt(index)
  }



  showSrc(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgageSelectedSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0]
    }
    else{
      this.imgageSelectedSrc = 'assets/click.webp';
      this.selectedImage = null;
    }
  }

  showLogoSrc(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.logoSelectedSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedLogo = event.target.files[0]
      console.log(this.selectedLogo)
    }
    else{
      this.logoSelectedSrc = 'assets/click.webp';
      this.selectedLogo = null;
    }
  }
  


  ngOnInit(): void {
    // this.resetForm();
  }

}
