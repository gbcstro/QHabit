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

  constructor(private afs: AngularFirestore, private authService: AuthenticationService) { }

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

  updateStudent(habit: Habit) {
    this.deleteHabit(habit);
    this.addHabit(habit);
  }

}
