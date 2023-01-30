import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Database, set, ref, update, onValue,remove } from '@angular/fire/database';
import {MatDialogRef} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Habit } from 'src/app/model/habit';
import { DataService } from 'src/app/services/data.service';

export function dateValidator(): ValidatorFn{
  

  return (control: AbstractControl): ValidationErrors | null => {
    
    const date = control.get('start')?.value;
    const currDate = new Date();

    if (date && currDate && date > currDate){
      return {
        futureDate: true
      }
    }

    return null;

  };
} 



@Component({
  selector: 'app-add-habit',
  templateUrl: './add-habit.component.html',
  styleUrls: ['./add-habit.component.css']
})
export class AddHabitComponent implements OnInit {

  addForm = new FormGroup({
    habit: new FormControl('', Validators.required),
    start: new FormControl<Date | null>(null, Validators.required),
  }, { validators:dateValidator() })
  
  constructor(
    private authService: AuthenticationService, 
    private database: Database,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddHabitComponent>,
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
    return this.addForm.get('habit');
  }

  get start() {
    return this.addForm.get('start');
  }

  addHabit (){
    const {habit, start} = this.addForm.value;

    if (!this.addForm.valid || !habit || !start ){
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
