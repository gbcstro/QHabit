import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit{

  user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    
  }

}
