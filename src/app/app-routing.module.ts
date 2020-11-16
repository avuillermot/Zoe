import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent  } from './search-customer/search-customer.component'
import { UpdateCustomerComponent } from './update-customer/update-customer.component'
import { WelcomeComponent } from './welcome/welcome.component'

const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "customer/search", component: SearchCustomerComponent },
  { path: "customer/update/:id", component: UpdateCustomerComponent },
  { path: "customer/add", component: UpdateCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
