import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent  } from './search-customer/search-customer.component'
import { HeaderComponent } from './header/header.component'
import { WelcomeComponent } from './welcome/welcome.component'

const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "search/customer", component: SearchCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
