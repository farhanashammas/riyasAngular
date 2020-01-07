import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicComponent } from './dynamic/dynamic.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailsComponent } from './details/details.component';
import { UsersComponent } from './users/users.component';
import { ErrorComponent } from './error/error.component';



const routes: Routes = [{path:'',component:DynamicComponent},
                        {path:'products',component:ProductsComponent},
                        {path:'additem',component:AddProductComponent},
                        {path:'details',component:DetailsComponent},
                        {path:'users',component:UsersComponent},
                        {path:'**',component:ErrorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
