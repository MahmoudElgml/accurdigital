import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudserviceService } from 'src/app/services/crudservice.service';
import { Unitformmodel } from 'src/app/shared/unitformmodel.model';

@Component({
  selector: 'app-categorydetalis',
  templateUrl: './categorydetalis.component.html',
  styleUrls: ['./categorydetalis.component.css']
})
export class CategorydetalisComponent implements OnInit {

  constructor(public _service: CrudserviceService, private _activatedRoute: ActivatedRoute) { }
  data: any = []
  allcategories: any = []
  isSubmitted: boolean = false
  isClicked:boolean=false
  isDoubleClicked:boolean=false
  doubleClickedUnitId:string
  clickedUnitId:string

  // isNotLoaded: boolean = true
  // noData : boolean = false
  isShown: boolean = false
  formdata: Unitformmodel = new Unitformmodel()
  unitForm = new FormGroup({
    uomKey : new FormControl(0),
    uomeCateg: new FormControl(''),
    uomeId: new FormControl(''),
    uomeDesc: new FormControl(''),
    umcsId: new FormControl(),
    uomeCaption: new FormControl(''),
    uomeSysFlg: new FormControl(''),
  });
  ngOnInit(): void {
    this.isShown = false;
    const id = this._activatedRoute.snapshot.params.id
    this._service.getSingleCategory(id).subscribe((res) => {
      this.data = res
    }, (e) => {
      console.log(e);
    }, () => {
      console.log("done getSingleCategory");
    })
    this._service.getallcategories().subscribe((res) => {
      this.allcategories = res
    })
  }
  addNewUnit() {
    const id = this._activatedRoute.snapshot.params.id
    this.formdata = this.unitForm.value
    this.formdata.umcsId = id
    this.formdata.uomKey=0
    this.formdata.uomeId=''
    
    this._service.addUnit(this.formdata).subscribe((res) => {
      this.toggleShow()
      console.log(res);
      this.refreshlist()
    }, (e) => {
      console.log(e);
    })
  }
  editUnit(data:any){
      
  }
  deleteunit(data: any) {
    this._service.deleteUnit(data).subscribe((res) => {
      console.log(res);
      this.refreshlist()
    }, (e) => {
      console.log(e);
    })
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }
  refreshlist() {
    const id = this._activatedRoute.snapshot.params.id

    this._service.getSingleCategory(id).subscribe((res) => {
      this.data = res
    }, (e) => {
      console.log(e);
    }, () => {
      console.log("done getSingleCategory");
    })
  }
  ref(data:any){
    this.refreshlist()
  }
  intiatePreview(data:any){
    this.isClicked=!this.isClicked
    this.isDoubleClicked=false
    this.clickedUnitId=data
  }
  intiateedit(data:any){
    this.isDoubleClicked=!this.isDoubleClicked
    this.isClicked=false
    this.doubleClickedUnitId=data

  }
  get uomeCateg() { return this.unitForm.get('uomeCateg') }
  get uomeDesc() { return this.unitForm.get('uomeDesc') }
  get uomeCaption() { return this.unitForm.get('uomeCaption') }
}
