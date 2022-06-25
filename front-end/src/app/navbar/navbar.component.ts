import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isIn: boolean = true;
  constructor(private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user_web_token') == null) {
      this.isIn = false;
    }
  }
  disconnect() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
