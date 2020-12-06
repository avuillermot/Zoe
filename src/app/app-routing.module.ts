import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { QuoteUpdateComponent } from './quote-update/quote-update.component';
import { QuoteSearchComponent } from './quote-search/quote-search.component';
import { WorkflowSendMailComponent } from './workflow-send-mail/workflow-send-mail.component';
import { PurchaseorderUpdateComponent } from './purchaseorder-update/purchaseorder-update.component';

const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "customer/search", component: SearchCustomerComponent },
  { path: "customer/update/:id", component: UpdateCustomerComponent },
  { path: "customer/add", component: UpdateCustomerComponent },
  { path: "product/search", component: ProductSearchComponent },
  { path: "product/update/:id", component: ProductUpdateComponent },
  { path: "product/add", component: ProductUpdateComponent },
  { path: "login", component: UserLoginComponent },

  // QUOTE
  { path: "quote/create", component: QuoteUpdateComponent },
  { path: "quote/read/:id", component: QuoteUpdateComponent },
  { path: "quote/update/:id", component: QuoteUpdateComponent },
  { path: "quote/search", component: QuoteSearchComponent },
  // parametre automatiquement le client
  { path: "quote/create/customer/:customer", component: QuoteUpdateComponent },

  //PURCHASE ORDER
  { path: "purchaseorder/create", component: PurchaseorderUpdateComponent },
  { path: "purchaseorder/read/:id", component: PurchaseorderUpdateComponent },
  { path: "purchaseorder/update/:id", component: PurchaseorderUpdateComponent },
  { path: "purchaseorder/search", component: PurchaseorderUpdateComponent },
  // parametre automatiquement le client
  { path: "purchaseorder/create/customer/:customer", component: PurchaseorderUpdateComponent },

  // WORKFLOW
  { path: "workflow/send-mail/:typedocument/:id", component: WorkflowSendMailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
