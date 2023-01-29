import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Database, set, ref, update, onValue,remove } from '@angular/fire/database';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-add-habit',
  templateUrl: './add-habit.component.html',
  styleUrls: ['./add-habit.component.css']
})
export class AddHabitComponent implements OnInit {

  addForm = new FormGroup({
    habit: new FormControl('', Validators.required),
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  })
  
  constructor(
    private authService: AuthenticationService, 
    private database: Database,
    private datePipe: DatePipe,
    ) {}

  

    
  ngOnInit(): void {
      
  }

  get habit() {
    return this.addForm.get('habit');
  }

 

  get start() {
    return this.addForm.get('start');
  }

  get end() {
    return this.addForm.get('end');
  }

  addHabit (){

    const {habit, start, end} = this.addForm.value;


    set(ref(this.database,'users/'+ '/' + habit),{
      habit: habit,
      start: this.datePipe.transform(start, "yyy-MM-dd"),
      end: this.datePipe.transform(end, "yyy-MM-dd")
    });
  }

}
