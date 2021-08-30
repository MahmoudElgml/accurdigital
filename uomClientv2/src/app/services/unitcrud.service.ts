import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitcrudService {
  baseURL='http://localhost:51044/api'
  constructor(private _http:HttpClient) { }
  getCategories():Observable<any>{
    return this._http.get(`${this.baseURL}/units/categories`)
  }
  getCategoryUnits(search:any):Observable<any>{
    return this._http.get(`${this.baseURL}/units/category/${search}`)
  }
  getSingleUnit(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/units/${id}`)
  }
  addUnit(data:any):Observable<any>{
    return this._http.post(`${this.baseURL}/units`,data)
  }
  editUnit(id:any,data:any):Observable<any>{
    return this._http.put(`${this.baseURL}/units/${id}`,data)
  }
  deleteUnit(id:number):Observable<any>{
    return this._http.delete(`${this.baseURL}/units/${id}`)
  }
}
