import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AddHabitComponent } from '../add-habit/add-habit.component';


@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit{


  constructor(private authService: AuthenticationService, private dialogRef: MatDialog) {}

  openDialog(){
    this.dialogRef.open(AddHabitComponent, {
      height: '36%',
      width: '55%'
    });
  }

  ngOnInit(): void {
    
  }

}
