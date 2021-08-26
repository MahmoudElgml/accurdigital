import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudserviceService } from 'src/app/services/crudservice.service';
import { Unitformmodel } from 'src/app/shared/unitformmodel.model';

@Component({
  selector: 'app-recentlyadded',
  templateUrl: './recentlyadded.component.html',
  styleUrls: ['./recentlyadded.component.css']
})
export class RecentlyaddedComponent implements OnInit {
  constructor(public _service: CrudserviceService, private _route: Router) { }
  formdata: Unitformmodel = new Unitformmodel()
  unitForm = new FormGroup({
    uomKey: new FormControl(0),
    uomeCateg: new FormControl(''),
    uomeId: new FormControl(''),
    uomeDesc: new FormControl(''),
    umcsId: new FormControl(),
    uomeCaption: new FormControl(''),
    uomeSysFlg: new FormControl(''),
  });
  ngOnInit(): void {
  }
  addcategandunit() {
    this.formdata = this.unitForm.value
    let categdata: any = {
      uomkey: 0,
      umcsId: "0",
      umcsDescTx: this._service.currentCategory,
    }
    console.log(categdata);
    this._service.addCategory(categdata).subscribe((res) => {
      console.log(res);
      this.formdata.umcsId = `${res}`
      this.formdata.uomKey = 0
      this.formdata.uomeId = ""
      this.formdata.uomeCateg = this._service.currentCategory
      this._service.addUnit(this.formdata).subscribe((res1) => {
        console.log(res1);
        this._route.navigateByUrl(`category/${res}`)},
        (e) => console.log(e))},
        (e) => this._route.navigateByUrl(`/recentlyAdded`))
  }
}
