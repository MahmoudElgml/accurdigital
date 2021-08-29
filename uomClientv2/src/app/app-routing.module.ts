import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryContentComponent } from './pages/category-content/category-content.component';
import { ListcategoriesComponent } from './pages/listcategories/listcategories.component';

const routes: Routes = [
  {path:"allCategories",component:ListcategoriesComponent},
  {path:"",redirectTo:"allCategories",pathMatch:"full"},
  {path:"category/:search",component:CategoryContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
