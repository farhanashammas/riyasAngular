import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {AngularWebStorageModule} from 'angular-web-storage';
import {RatingModule} from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { LoginComponent } from './dynamic/login/login.component';
import { LoginformComponent } from './dynamic/loginform/loginform.component';
import { SignupComponent } from './dynamic/signup/signup.component';
import { SignupformComponent } from './dynamic/signupform/signupform.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailsComponent } from './details/details.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent,
    LoginComponent,
    LoginformComponent,
    SignupComponent,
    SignupformComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ProductsComponent,
    AddProductComponent,
    DetailsComponent,
    UsersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularWebStorageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
