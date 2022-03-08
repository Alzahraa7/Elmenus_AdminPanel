import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/Model/user';
import { UserService } from 'src/app/Service/user.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css','../../Components/table/table.component.css'],
})
export class UsersComponent implements OnInit {
  Users: IUser[] = [];
  faTrash = faTrashAlt;
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.userService.getAllUsers().subscribe((user: IUser[]) => {
      console.log(user);
      this.Users = user;
    });
  }
  ngOnInit(): void {}
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['bg-success', 'text-white'],
      duration: 3000,
    });
  }
  DeleteUser(iduser:string){
     console.log(iduser)
     let dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { mess: `Are you sure you want to delete this user ?` },
    });
    dialogRef.afterClosed().subscribe((i) => {
      if (i.data) {
        this.userService.DeleteUser(iduser)
        this.openSnackBar('User Delete Successfully!');
      }
    });
  }
}
