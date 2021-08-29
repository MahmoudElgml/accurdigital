import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListcategoriesComponent } from './pages/listcategories/listcategories.component';
import { CategoryContentComponent } from './pages/category-content/category-content.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { EditunitComponent } from './pages/editunit/editunit.component';

@NgModule({
  declarations: [
    AppComponent,
    ListcategoriesComponent,
    CategoryContentComponent,
    EditunitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
