import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MobileService } from '../mobile.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document, private mobileService: MobileService,private formBuilder: FormBuilder, private router: Router, private local: LocalStorageService, private sanitizer: DomSanitizer) { 
    this.createForm();
  }

  file: File;
  registerForm: FormGroup;
  elements: any = {};
  flag: boolean;
  item: any = {};
  submitted = false;
  imgControl=false;

  ngOnInit() {
    this.elements = this.mobileService.getLocalStorage();
    if (this.elements.Token) {  
      this.mobileService.changeUserName(this.elements.name, "Logout");
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
  
//listening to file change , when selected multiple files taking the first one only

fileChange(event) {
  let fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    this.file = fileList[0];

  }
}

createForm() {
  this.registerForm = this.formBuilder.group({
    'video': new FormControl(),
    'name': new FormControl(),

     });
}

// addItem() {
//   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//   this.router.navigate(['additem']);
//   });
// }


// // for adding item to the menu

// addItem() {

//   this.submitted = true;
//   if (this.registerForm.invalid) {
//     alert("invalid")
//     return;
//   }
//   let Status;
//     if (this.file) {

//       //addItem part
//       let formData: FormData = new FormData();
//       formData.append('userId', this.elements.userId);
//       formData.append('name', this.registerForm.get('name').value);
//       formData.append('video', this.file, this.file.type);
//       // console.log(formData)
//       this.mobileService.addVideo(formData, this.elements.Token)
//         .subscribe((result) => {
//           Status = JSON.parse(JSON.stringify(result)).Status;
//           // alert(Status);
//           if(Status=="Success"){
//             alert(Status) 
//           }else
//           alert(Status)  
//         });
//     }
//     else {
//       alert("Choose a file");//if file is empty
//     }
//   }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}


