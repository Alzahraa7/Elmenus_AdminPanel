import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IBranches } from 'src/app/Model/branches';
import { BranchesService } from 'src/app/Service/branches.service';
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  addBranchForm: FormGroup;
  ResId:string|null;
  @Output()submitted : EventEmitter<boolean>;

  submit:boolean= true;
  @Input() clickAdd:boolean = true;
  constructor(private FormService: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,private _snackBar: MatSnackBar , private branchSrvs:BranchesService) {
      this.addBranchForm = this.FormService.group({
        LocName:['', [Validators.required, Validators.minLength(4)]],
        Address: ['', [Validators.required, Validators.minLength(10)]],
        Workinghours:['',[Validators.required,Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9](( )(AM||PM))(( )-( ))([0-1]?[0-9]|2[0-3]):[0-5][0-9](( )(AM||PM))$')]]
      });
      this.ResId = activeRoute.snapshot.paramMap.get('id');
      this.submitted = new EventEmitter<boolean> ();
  }

  ngOnInit(): void {
  }
  get LocName(){
    return this.addBranchForm.get('LocName');
  }
  get Address(){
    return this.addBranchForm.get('Address');
  }
  get Workinghours(){
    return this.addBranchForm.get('Workinghours');
  }
  openSnackBar(message: string) {
    this._snackBar.open(message,"",{
      horizontalPosition:"end",
      verticalPosition:"top",
      panelClass:['bg-success','text-white'],
      duration:2000
    });
  }
  SubmitBranch(){
    let Branch: IBranches = this.addBranchForm.value as IBranches;
    console.log(Branch);
    this.branchSrvs.addBranch(Branch,this.ResId);
    this.addBranchForm.reset();
    this.clickAdd =false;
    this.openSnackBar(`You have added new branch`);
    this.submitted.emit(this.submit);
  }

}
