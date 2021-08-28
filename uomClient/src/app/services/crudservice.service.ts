import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {
  baseurl = "http://localhost:51044/api"
  currentCategory: string = ""
  data: any
  constructor(private _http: HttpClient) { }
  getallcategories(): Observable<any> {
    return this._http.get(`${this.baseurl}/category`)
  }
  getSingleCategoryUnits(id: string): Observable<any> { 
    return this._http.get(`${this.baseurl}/category/${id}`)
  }
  getSingleCategory(id:any):Observable<any>{
    return this._http.get(`${this.baseurl}/category/single/${id}`)
  }
  addCategory(categoryForm: any): Observable<any> {
    return this._http.post(`${this.baseurl}/category`,categoryForm)
  }
  getSingleUnit(id: string): Observable<any> {
    return this._http.get(`${this.baseurl}/units/${id}`)
  }
  getAllUnits():Observable<any>{
    return this._http.get(`${this.baseurl}/units`)
  }
  getUnit(id:any): Observable<any> {
    return this._http.get(`${this.baseurl}/units/${id}`)
  }
  addUnit(data:any): Observable<any> {
    return this._http.post(`${this.baseurl}/units`,data)
  }
  editUnit(id:any,input: any): Observable<any> {
    return this._http.put(`${this.baseurl}/units/${id}`, input)
  }
  deleteUnit(id: number) {
    return this._http.delete(`${this.baseurl}/units/${id}`);
  }
  getUnitConversions(id:any):Observable<any>{
    return this._http.get(`${this.baseurl}/conversions/unit/${id}`)
  }
  addConversion(data:any):Observable<any>{
    return this._http.post(`${this.baseurl}/conversions`,data)
  }

  
}
