import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboardSubmit';
  constructor(private router: Router){}

  navigateToUserUpsert() {
    this.router.navigate(['/user-upsert']);
  }
}
