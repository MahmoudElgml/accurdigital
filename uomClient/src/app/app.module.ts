import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListcategoriesComponent } from './pages/listcategories/listcategories.component';
import { CategorydetalisComponent } from './pages/categorydetalis/categorydetalis.component';
import { EditunitComponent } from './pages/editunit/editunit.component';
import { PreviewunitComponent } from './pages/previewunit/previewunit.component';
import { RecentlyaddedComponent } from './pages/recentlyadded/recentlyadded.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListcategoriesComponent,
    CategorydetalisComponent,
    EditunitComponent,
    PreviewunitComponent,
    RecentlyaddedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
