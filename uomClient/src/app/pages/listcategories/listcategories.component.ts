import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudserviceService } from 'src/app/services/crudservice.service';


@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent implements OnInit {
  constructor(private _service: CrudserviceService,private _route:Router) { }

  data: any = []
  toBeAdded:any=[]
  ngOnInit(): void {
    // localStorage.removeItem('toBeAddedCategories')
    this._service.getallcategories().subscribe((res) => {
      this.data = res
    }, (e) => {
      console.log(e);
    }, () => {
      console.log("done");
    })
  }
  newCategory: any = {
    "uomkey":"",
    "umcsId": "",
    "umcsDescTx": ""
  };
  onclickcategory(umcsId:any,categoryName:string){
    this._service.currentCategory=categoryName
    if(umcsId!=""){
    this._route.navigateByUrl(`/category/${umcsId}`)
    }else{
      this._route.navigateByUrl(`/recentlyAdded`)
    }
  }
  addCategory() {
    this.toBeAdded.push(this.newCategory)
    localStorage.setItem('toBeAddedCategories',JSON.stringify(this.toBeAdded))
    this.data.push(this.newCategory);
    console.log(this.data);
    this.newCategory = {
      "uomkey":"",
      "umcsId": "",
      "umcsDescTx": ""
    };;
  }

}
