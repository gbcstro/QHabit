import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HabitListComponent } from '../components/habit-list/habit-list.component';
import { Habit } from '../model/habit';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user = this.authService.userData.uid
  dateNow = new Date();

  constructor(
    private afs: AngularFirestore, 
    private authService: AuthenticationService,
    private datePipe: DatePipe) { }

  addHabit(habit : Habit){
    habit.id = this.afs.createId();
    return this.afs.collection(this.user).add(habit);
  }

  getHabits(){
    return this.afs.collection(this.user).snapshotChanges();
  }

  deleteHabit(habit: Habit) {
    return this.afs.doc(this.user + '/' + habit.id).delete();
  }

  resetDate(habit: Habit) {
    const now = this.datePipe.transform(this.dateNow, "MM-dd-yyyy");

    return this.afs.doc(this.user + '/' + habit.id).update({convertedDate:now});
  }

}
