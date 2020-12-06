import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { PasswordModule } from 'primeng/password';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MenuComponent } from './menu/menu.component'
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserUpdateComponent } from './user-update/user-update.component';

import { AuthInterceptor } from '../app/_services/auth.interceptor';
import { QuoteUpdateComponent } from './quote-update/quote-update.component';
import { QuoteSearchComponent } from './quote-search/quote-search.component';

import { DocumentStatusPipe } from '../app/_pipes/document.status.pipe';
import { WorkflowSendMailComponent } from './workflow-send-mail/workflow-send-mail.component';
import { ChildTabpanelAddressComponent } from './child-tabpanel-address/child-tabpanel-address.component';
import { ChildTabpanelDetailComponent } from './child-tabpanel-detail/child-tabpanel-detail.component';
import { ChildTabpanelViewpdfComponent } from './child-tabpanel-viewpdf/child-tabpanel-viewpdf.component';
import { PurchaseorderUpdateComponent } from './purchaseorder-update/purchaseorder-update.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    WelcomeComponent,
    SearchCustomerComponent,
    UpdateCustomerComponent,
    ProductSearchComponent,
    ProductUpdateComponent,
    UserLoginComponent,
    UserUpdateComponent,
    QuoteUpdateComponent,
    QuoteSearchComponent,
    DocumentStatusPipe,
    WorkflowSendMailComponent,
    ChildTabpanelAddressComponent,
    ChildTabpanelDetailComponent,
    ChildTabpanelViewpdfComponent,
    PurchaseorderUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    PanelModule,
    BlockUIModule,
    PasswordModule,
    AutoCompleteModule,
    CalendarModule,
    TabViewModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
