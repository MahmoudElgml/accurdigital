import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorydetalisComponent } from './pages/categorydetalis/categorydetalis.component';
import { EditunitComponent } from './pages/editunit/editunit.component';
import { HomeComponent } from './pages/home/home.component';
import { ListcategoriesComponent } from './pages/listcategories/listcategories.component';
import { RecentlyaddedComponent } from './pages/recentlyadded/recentlyadded.component';

const routes: Routes = [
  { path: 'categories', component: ListcategoriesComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'recentlyAdded', component: RecentlyaddedComponent,pathMatch: 'full' },
  { path: 'category/:id', component: CategorydetalisComponent,pathMatch:'full'},
  { path: 'editunit/:id', component: EditunitComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
