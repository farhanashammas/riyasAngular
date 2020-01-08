import { Component, OnInit } from '@angular/core';
import { MobileService } from 'src/app/mobile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  flag: boolean = true;
  constructor(private mobileService: MobileService, private router: Router) { }

  ngOnInit() {
    this.mobileService.currentUserName.subscribe(userName => this.userName = userName);
    this.mobileService.logOutStatus.subscribe(logout => this.logOut = logout);
  }

  logOut: string;
  userName: string;

  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {

    //on logout clear local storage and reset state

    this.mobileService.clearLocalStorage();
    this.flag = true;
    this.userName = "";
    this.logOut = "";
    this.navbarOpen = false;
    this.router.navigateByUrl("");

  }


}
