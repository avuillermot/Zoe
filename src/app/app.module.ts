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

import { MenuComponent } from './menu/menu.component'
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

import { AuthInterceptor } from '../app/_services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    WelcomeComponent,
    SearchCustomerComponent,
    UpdateCustomerComponent,
    ProductSearchComponent,
    ProductUpdateComponent
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
    BlockUIModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
