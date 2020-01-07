  import { Component, OnInit, HostListener, Inject } from '@angular/core';
  import { DOCUMENT } from '@angular/common';
  import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
  import { Router } from '@angular/router';
  import { MobileService } from '../mobile.service';
  import {Product} from '../products/product.model'
  import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { DomSanitizer } from '@angular/platform-browser';
  
  @Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
  })

  
  export class DetailsComponent implements OnInit {
    
    elements: any = {};
    product=new Product(null,null,null,null,null,null,null,null,null,null,null,null,null);
    submitted:boolean=false;
    constructor(@Inject(DOCUMENT) document, private mobileService: MobileService, private sanitizer: DomSanitizer,private router: Router, private formBuilder: FormBuilder, private local: LocalStorageService) {
     }
  
    ngOnInit() {
      this.elements = this.mobileService.getLocalStorage();
  
      //login credential for login
        if (this.elements.Token) {
         
      // // itemId
        let local = this.local.get('itemId');
      //  console.log(local);

        //getting  info from server
          this.mobileService.itemFetch(this.elements.userId, local, this.elements.Token)
          .subscribe((data) => {
            let result = JSON.parse(JSON.stringify(data));
            if (result.Status == "Error") {
              alert(result.Status);
            }
            else {
              this.product = result.item;
              // console.log(this.product);
              // this.provideValue();
            }
          });
          this.mobileService.changeUserName(this.elements.name,"logout");
      }
      else {
        this.router.navigateByUrl("");
      }
    }
  
    //sticky header
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

  transform(base64Image: any) {
    // console.log(base64Image);
     return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
   }

   
  deleteItem(itemId) {
    this.mobileService.deleteItem(this.elements.userId, itemId, this.elements.Token)
      .subscribe((result) => {
        if (JSON.parse(JSON.stringify(result)).Status == "Success") {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['products']);
          });
        }
        else 
          alert("Error");
      });
  }

  editItem(id, flag) {
    this.local.remove('itemId');
    this.local.set('itemId', id);
    this.local.remove('flag');
    this.local.set('flag', flag);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['additem']);
    });
  }

  }
  