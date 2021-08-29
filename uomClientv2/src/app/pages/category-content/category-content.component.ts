import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnitcrudService } from 'src/app/services/unitcrud.service';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.css']
})
export class CategoryContentComponent implements OnInit {
  categoryContent: any = [];
  constructor(private _service: UnitcrudService, private _activatedRoute: ActivatedRoute) { }
  search = this._activatedRoute.snapshot.params.search
  defaultformData: any
  formData = new FormGroup({
    uomkey: new FormControl(0),
    uomeCateg: new FormControl(this.search),
    uomeId: new FormControl(""),
    uomeDesc: new FormControl(""),
    uomeCaption: new FormControl(""),
    uomeSysFlg: new FormControl("Y"),
    umcsId: new FormControl("")
  })
  ngOnInit(): void {
    this.refreshList(this.search)
    this.defaultformData = this.formData.value
  }
  addUnitOnSubmit() {
    this._service.addUnit(this.formData.value).subscribe(
      (res) => {
        console.log(res)
        this.refreshList(this.search)
        this.formData.reset(this.defaultformData);
      })
  }
  onDeleteUnit(id: number) {
    this._service.deleteUnit(id).subscribe((res) => {
      console.log(res);
      this.refreshList(this.search)
    })

  }
  refreshList(data: any) {
    this._service.getCategoryUnits(data).subscribe(
      (res) => { this.categoryContent = res }
    )
  }

}
