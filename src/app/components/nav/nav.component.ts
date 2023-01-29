import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public authService: AuthenticationService) { }

  ngOnInit(): void {
      
  }

  logout() {
    this.authService.SignOut();
  }

} 
