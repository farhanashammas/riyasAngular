  import { Component, OnInit, HostListener, Inject } from '@angular/core';
  import { DOCUMENT } from '@angular/common';
  import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
  import { Router } from '@angular/router';
  import { MobileService } from '../mobile.service';
  import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
  import { DomSanitizer } from '@angular/platform-browser';
  
  
  

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  file: File;
  registerForm: FormGroup;
  elements: any = {};
  flag: boolean;
  item: any = {};
  submitted = false;
  imgControl=false;
  constructor(@Inject(DOCUMENT) document, private mobileService: MobileService, private router: Router, private formBuilder: FormBuilder, private local: LocalStorageService, private sanitizer: DomSanitizer) {

this.createForm();


   }

  ngOnInit() {

    // getLocalStorage() returns login credentials

    this.elements = this.mobileService.getLocalStorage();
    if (this.elements.Token) {
      this.flag = this.local.get('flag');

     
      //flag is true for updateItem and false for addItem 

      if (this.flag) {
        let id = this.local.get('itemId');
     //   console.log("itemId    " + id)
        this.mobileService.itemFetch(this.elements.userId, id, this.elements.Token)
          .subscribe((data) => {


            let result = JSON.parse(JSON.stringify(data));
            if (result.Status == "Error") {
              alert(result.Status);
            }
            else {

              this.item = result.item;

            //  console.log(this.item);
            this.imgControl=true;
              this.provideValue();
            }
          });

      }
     
      this.mobileService.changeUserName(this.elements.name, "logout");

    }
    else {
      this.router.navigateByUrl("");
    }
  }


// For making header sticky while scrolling

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

  createForm() {
    this.registerForm = this.formBuilder.group({
      'productName': new FormControl('', Validators.required),
      'image': new FormControl(),
      'productCategory': new FormControl('', Validators.required),
      'productAvailability': new FormControl('', Validators.required),
      'productColor': new FormControl(),
      'productBrand': new FormControl('', Validators.required),
      'productCamera': new FormControl(),
      'productMemory': new FormControl(),
      'productProcessor': new FormControl(),
      'productPrice': new FormControl('', Validators.required),
      'productDescription':new FormControl(),
    });
  }

// assigning selected item details choosen for updation

  provideValue(){
    this.registerForm.get('productName').disable();
    this.registerForm.get('productName').setValue(this.item.productName);
    this.registerForm.get('productCategory').setValue(this.item.productCategory);
    this.registerForm.get('productAvailability').setValue(this.item.productAvailability);
    this.registerForm.get('productColor').setValue(this.item.productColor);
    this.registerForm.get('productBrand').setValue(this.item.productBrand);
    this.registerForm.get('productCamera').setValue(this.item.productCamera);
    this.registerForm.get('productMemory').setValue(this.item.productMemory);
    this.registerForm.get('productProcessor').setValue(this.item.productProcessor);
    this.registerForm.get('productPrice').setValue(this.item.productPrice);
    this.registerForm.get('productDescription').setValue(this.item.productDescription);
  }


// Sanitizing base64 image string , must for angular 7

  transform(base64Image: any) {
  //  console.log(base64Image);
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }


//listening to file change , when selected multiple files taking the first one only

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];

    }
  }



// for adding item to the menu

  addItem() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      alert("invalid")
      return;
    }
    let Status;
    if (!this.flag) {
      if (this.file) {

        //addItem part
        let formData: FormData = new FormData();
        formData.append('userId', this.elements.userId);
        formData.append('productCategory', this.registerForm.get('productCategory').value);
        formData.append('productName', this.registerForm.get('productName').value);
        formData.append('productPrice', this.registerForm.get('productPrice').value);
        formData.append('productAvailability', this.registerForm.get('productAvailability').value);
        formData.append('productColor', this.registerForm.get('productColor').value);
        formData.append('productBrand', this.registerForm.get('productBrand').value);
        formData.append('productCamera', this.registerForm.get('productCamera').value);
        formData.append('productMemory', this.registerForm.get('productMemory').value);
        formData.append('productProcessor', this.registerForm.get('productProcessor').value);
        formData.append('productDescription', this.registerForm.get('productDescription').value);
        formData.append('image', this.file, this.file.type);

        this.mobileService.addItem(formData, this.elements.Token)
          .subscribe((result) => {
            Status = JSON.parse(JSON.stringify(result)).Status;
            // alert(Status);
            if(Status=="Success"){
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['products']);
              });
            }else
            alert(Status)  
          });
      }
      else {
        alert("Choose a file");//if file is empty
      }
    }
    else {

      //updateItem part
      let productCategory = this.registerForm.get('productCategory').value;
      let productName = this.registerForm.get('productName').value;
      let productPrice = this.registerForm.get('productPrice').value;
      let productMemory = this.registerForm.get('productMemory').value;
      let productProcessor = this.registerForm.get('productProcessor').value;
      let productAvailability = this.registerForm.get('productAvailability').value;
      let productColor = this.registerForm.get('productColor').value;
      let productBrand = this.registerForm.get('productBrand').value;
      let productCamera = this.registerForm.get('productCamera').value;
      let productDescription = this.registerForm.get('productDescription').value;

      this.mobileService.updateItem(this.elements.userId,productCategory, productName, productPrice,
        productCamera,productMemory,productProcessor,productAvailability,
        productColor,productBrand,productDescription,this.elements.Token)
        .subscribe((result) => {
          Status = JSON.parse(JSON.stringify(result)).Status; 
          // alert(Status);
          if(Status=='Success'){
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['products']);
            });
          } 
         else 
          alert(Status)
        });
    }

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}

