import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserLoginComponent } from './user-login/user-login.component'

const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "customer/search", component: SearchCustomerComponent },
  { path: "customer/update/:id", component: UpdateCustomerComponent },
  { path: "customer/add", component: UpdateCustomerComponent },
  { path: "product/search", component: ProductSearchComponent },
  { path: "product/update/:id", component: ProductUpdateComponent },
  { path: "product/add", component: ProductUpdateComponent },
  { path: "login", component: UserLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
