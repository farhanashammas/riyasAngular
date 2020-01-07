import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/mobile.service';
import { User } from '../users/user.model';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
    constructor(@Inject(DOCUMENT) document, private mobileService: MobileService, private router: Router, private local: LocalStorageService, private sanitizer: DomSanitizer) { }
  
    registerForm: FormGroup;
  
    submitted = false;
    searchData: any = {};
    elements: any = {};
    count: Number;
    user = new User(null,null,null,null,null,null);
    flag: boolean = false;
    value;
    fileData: File = null;
    max = 5;
    category:Boolean=false;
    
    ngOnInit() {
      this.elements = this.mobileService.getLocalStorage();
      if (this.elements.Token) {
  
        this.mobileService.showUsers(this.elements.userId, this.elements.Token)
            .subscribe((data) => {
              let result = JSON.parse(JSON.stringify(data));
            //  console.log(result);
              if (result.Status == "Error") {
                alert(result.Status);
              }
              else {
                // console.log("DAata   "+result.restaurant.items[0]._id);
                this.user = result.data.sort((a,b) => b._id.localeCompare(a._id));
                // console.log(this.user);
                
              }
            });
            this.mobileService.changeUserName(this.elements.name, "logout");
      }
      else {
        this.router.navigateByUrl("");
      }
    }
  
    @HostListener('window:scroll', ['$event'])
  
    onWindowScroll(e) {
      if (window.pageYOffset > 20) {
        let element = document.getElementById('navbar');
        element.classList.add('sticky');
      } else {
        let element = document.getElementById('navbar');
        element.classList.remove('sticky');
      }
    }
  
    //sanitizer
  
  
  
    // //for admin for deleting an account
  
    deleteUser(id) {
      this.mobileService.deleteUser(this.elements.userId, id, this.elements.Token)
        .subscribe((result) => {
          let Status = JSON.parse(JSON.stringify(result)).Status;
          if (Status == "Success") {
            this.local.remove('id');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['users']);
            });
          }
          else {
            alert(Status);
          }
        })
    }
  
  }
  