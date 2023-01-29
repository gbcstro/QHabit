import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    public authService: AuthenticationService,
    private router: Router) { }

  logout() {
    this.authService.SignOut();
  }

} 
