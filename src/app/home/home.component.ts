import { Component, OnInit, HostListener, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/mobile.service';
import { Product } from '../products/product.model';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
    registerForm: FormGroup;
    submitted = false;
    searchData: any = {};
    elements: any = {};
    count: number;
    image;
    forwardMove: boolean = false;
    backwardMove: boolean = false;
    totalDocs = 0;
    value;

    constructor(@Inject(DOCUMENT) document, private mobileService: MobileService, private router: Router, private formBuilder: FormBuilder, public local: LocalStorageService, private sanitizer: DomSanitizer) { }
  
    ngOnInit() {
      this.elements = this.mobileService.getLocalStorage();
      if (this.elements.Token) {
        this.registerForm = this.formBuilder.group({
          searchKey: ['', [Validators.required, Validators.minLength(1)]],
          fieldType: ['productBrand', Validators.required]
        });
  
        // display userName and logout on top right corner of head
        this.mobileService.changeUserName(this.elements.name, "logout");
  
        //state loading from service
        let data = this.mobileService.getDataPresent();
  
  
        if (!data.restaurants) {
          this.mobileService.products(this.elements.userId, this.elements.Token)
            .subscribe((restaurants) => {
            //  console.log(restaurants);
  
              let result = JSON.parse(JSON.stringify(restaurants));
  
              this.restaurants = result.restaurants;
              // .sort((a,b) => b._id.localeCompare(a._id));
            //  console.log(this.restaurants);
  
              this.count = 0;
  
  
              this.mobileService.setDataPresent(this.restaurants, this.count, result.totalDocs,"","location",false,false); 
    
            });
        }
        else {
          this.restaurants = data.restaurants;
          this.count = data.count;
          this.totalDocs = data.totalDocs;
          this.forwardMove=data.forwardMove;
          this.backwardMove=data.backwardMove;
          this.registerForm.get('searchKey').setValue(data.searchKey);
          this.registerForm.get('fieldType').setValue(data.fieldType);
        }
      }
      else {
        this.router.navigateByUrl("");
      }
    }
  
    restaurants: Product[];
    max: number = 5;
  
  
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
  
  
  // sanitizing base64 string image
  
    transform(base64Image: any) {
      //console.log(base64Image);
      return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
    }
  
  
  //searching based on values selected
  
    search() {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
  
      this.searchData.searchKey = this.registerForm.get('searchKey').value;
      this.searchData.fieldType = this.registerForm.get('fieldType').value;
      this.searchData.userId = this.elements.userId;
      this.searchData.count = this.count;
      this.mobileService.search(this.searchData, this.elements.Token)
        .subscribe((result) => {
          let results = JSON.parse(JSON.stringify(result));
          // .sort((a,b) => b._id.localeCompare(a._id));
          if (results.Status == "Error") {
            alert(results.Status);
          }
          else {
            this.restaurants = results.restaurants;
            this.totalDocs = results.totalDocs;
            // console.log("Totaldocs count "+this.totalDocs+" "+ this.count);
            if(this.count>=0 && this.totalDocs-10>this.count ){
              this.forwardMove=true;
            }
            else{
              this.forwardMove=false;
            }
            if (this.count==0) {
              this.backwardMove = false;
            }
            else{
              this.backwardMove=true;
            }
  
            this.mobileService.setDataPresent(this.restaurants, this.count, this.totalDocs,this.searchData.searchKey,this.searchData.fieldType,this.forwardMove,this.backwardMove);
          }
  
        });
    }
  
  //for navigating to a particular restaurant 
  
    menu(id) {
      this.local.remove('id');
      this.local.set('id', id);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['show']);
      });
    }
  
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
    }
  
  
  
    backward() {
      this.count -= 10;
      this.search();
    }
  
    forward() {
      this.count += 10;
      this.search();
    }
  
    productDetail(id){
      this.local.remove('itemId');
      this.local.set('itemId', id);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['details']);
      });
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
  
    // feedback(restaurant) {
    //   this.mobileService.feedback(this.elements.userId, restaurant._id, this.value, this.elements.Token)
    //     .subscribe((result) => {
    //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //         this.router.navigate(['details']);
    //       });
  
    //     });
    // }
    
    addItem(flag) {
      this.local.remove('flag');
      this.local.set('flag', flag);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['additem']);
      });
    }

    manageUsers(){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['users']);
    });
  }

  
  }
  