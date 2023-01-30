import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Database, set, ref, update, onValue,remove } from '@angular/fire/database';
import {MatDialogRef} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Habit } from 'src/app/model/habit';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.css']
})
export class EditHabitComponent implements OnInit{
  editForm = new FormGroup({
    habit: new FormControl('', Validators.required),
    start: new FormControl<Date | null>(null, Validators.required),
  })
  
  constructor(
    private authService: AuthenticationService, 
    private database: Database,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditHabitComponent>,
    private data: DataService 
    ) {}
    
  ngOnInit(): void {
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  user = this.authService.userData
  uid = this.user.uid

  get habit() {
    return this.editForm.get('habit');
  }


  get start() {
    return this.editForm.get('start');
  }


  addHabit (){
    const {habit, start} = this.editForm.value;

    if (!this.editForm.valid || !habit || !start ){
      return;
    }


    const habitObj: Habit = {
      id: '',
      habit: habit,
      convertedDate: this.datePipe.transform(start, "MM-dd-yyyy"),
    };

    this.data.addHabit(habitObj);
    
    this.dialogRef.close();
  }
}
