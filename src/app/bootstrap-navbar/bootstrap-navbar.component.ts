import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent implements OnDestroy {

  appUser: AppUser;
  subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = authService.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
