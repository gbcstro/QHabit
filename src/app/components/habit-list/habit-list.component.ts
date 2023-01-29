import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AddHabitComponent } from '../add-habit/add-habit.component';
import { DataService } from 'src/app/services/data.service';
import { Habit } from 'src/app/model/habit';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { EditHabitComponent } from '../edit-habit/edit-habit.component';


@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit{
 
  user = this.authService.userData.uid;
  habitList : Habit[] = [];

  constructor(
    private authService: AuthenticationService, 
    private dialog: MatDialog, 
    private data: DataService,
    private toast: HotToastService) {
    
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddHabitComponent, {
      height: '50%',
      width: '55%'
    });
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditHabitComponent, {
      height: '50%',
      width: '55%'
    });
  }

  ngOnInit(): void {
    this.getAllHabits();
  }

  getAllHabits() {
    this.data.getHabits().subscribe(res => {
      this.habitList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });

    }, err => {
      this.toast.observe({
        error: ({message}) => 'There was an error: ${message}'
      })
    });
  }

  deleteHabit(habit : Habit){
    this.data.deleteHabit(habit);
  }


}
