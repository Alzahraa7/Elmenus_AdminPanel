import { Component, OnInit } from '@angular/core';
import { CareerfirebaseService } from 'src/app/Service/careerfirebase.service';
import { map } from 'rxjs';
import {
  faCoffee,
  faTrashAlt,
  faEdit,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ICareer } from 'src/app/Model/icareer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-career',
  templateUrl: './list-career.component.html',
  styleUrls: ['./list-career.component.css'],
})
export class ListCareerComponent implements OnInit {
  Careers: ICareer[] | any;
  index2: number = 0;
  faCoffee = faCoffee;
  faTrash = faTrashAlt;
  faEdit = faEdit;
  faCirclePlus = faCirclePlus;
  constructor(
    private _snackBar: MatSnackBar,
    private careerService: CareerfirebaseService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.careerService.getAllCareers().subscribe((career: ICareer[]) => {
      console.log(career[0].id);
      this.Careers = career;
    });

    this.careerService.getJobs().subscribe((job: any) => {
      console.log(job[0].id);
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['bg-success', 'text-white'],
      duration: 3000,
    });
  }
  saveValue(event: any) {
    //  console.log(event.target.value)
    this.index2 = event.target.value;
  }
  Edit(i: number, index2: number) {
    // console.log(i);
    // console.log(index2)
  }
  deleteJob(event: any, job: any, Career: any) {
    let dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { mess: `Are you sure you want to delete this Job ?` },
    });
    dialogRef.afterClosed().subscribe((i) => {
      if (i.data) {
        console.log(Career);
        this.careerService.deleteJob(job, Career);
        this.openSnackBar('Collection of this Job Delete Successfully');
      }
    });
  }
  deleteCareer(Career: any) {
    let dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { mess: `Are you sure you want to delete this Job ?` },
    });
    dialogRef.afterClosed().subscribe((i) => {
      if (i.data) {
        console.log(Career);
        this.careerService.deleteCareer(Career);
        this.openSnackBar('Career Delete Successfully');
      }
    });
  }

  addCareer() {
    this.router.navigate(['addCareer']);
  }
  JobDetails(jobName: string) {
    console.log(jobName);
    this.careerService.getJobID(jobName).subscribe((job: any) => {
      const d = job;
      console.log(d[0]);
    });
    this.router.navigate(['JobDetails', jobName]);
  }
  EditCareer(idCareer: string) {
    console.log(idCareer);
    this.router.navigate(['addCareer', idCareer]);
  }
  UpdateJob(JobName: string) {
    this.router.navigate(['addJob', JobName]);
  }
  AddJobDetails(id: string, JobName: string) {
    console.log(id, JobName);
    this.router.navigate(['addJob', id, JobName]);
  }
}
