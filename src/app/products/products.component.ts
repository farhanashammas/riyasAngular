import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/mobile.service';
import { Product } from '../products/product.model';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document, private mobileService: MobileService, private router: Router, private local: LocalStorageService, private sanitizer: DomSanitizer) { }

  registerForm: FormGroup;

  submitted = false;
  searchData: any = {};
  elements: any = {};
  count: Number;
  product = new Product(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  flag: boolean = false;
  value;
  fileData: File = null;
  max = 5;
  category:Boolean=false;

  ngOnInit() {
    this.elements = this.mobileService.getLocalStorage();
    if (this.elements.Token) {  

      this.mobileService.showProducts(this.elements.userId, this.elements.Token)
          .subscribe((data) => {
            let result = JSON.parse(JSON.stringify(data));
          //  console.log(result);
            if (result.Status == "Error") {
              alert(result.Status);
            }
            else {
              // console.log("DAata   "+result.restaurant.items[0]._id);
              this.product = result.data;
              // .sort((a,b) => b._id.localeCompare(a._id));
              // console.log(this.product);
              
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

  transform(base64Image: any) {
   // console.log(base64Image);
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }



 
  productDetail(id){
    this.local.remove('itemId');
    this.local.set('itemId', id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['details']);
    });
  }

  // //for admin for deleting an account

  // deleteUser(id) {
  //   this.mobileService.deleteUser(this.elements.userId, id, this.elements.Token)
  //     .subscribe((result) => {
  //       let Status = JSON.parse(JSON.stringify(result)).Status;
  //       if (Status == "Success") {
  //         this.local.remove('id');
  //         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //           this.router.navigate(['restaurant']);
  //         });
  //       }
  //       else {
  //         alert(Status);
  //       }
  //     })
  // }


  // 

  // infoUser(ownerId) {
  //   this.local.remove('infoid');
  //   this.local.set('infoid', ownerId);
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['info']);
  //   });
  // }
  manageUsers(){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['users']);
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
  //         this.router.navigate(['show']);
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
  // selectChangeHandlerItem(event: any) {
  //   this.category = event.target.value;
  //   console.log(this.category);
  // }

  filterBy(event:any){
    this.category=true; 
    let cat = event.target.value;
    this.mobileService.filter(this.elements.userId, this.elements.Token,cat)
    .subscribe((data) => {
      let result = JSON.parse(JSON.stringify(data));
      if (result.Status == "Error") {
        alert(result.Status);
      }
      else {
        this.product = result.data;
      }
    });
  }

}
