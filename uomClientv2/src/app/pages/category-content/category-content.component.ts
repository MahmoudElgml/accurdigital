import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnitcrudService } from 'src/app/services/unitcrud.service';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.css']
})
export class CategoryContentComponent implements OnInit {
  @ViewChildren('tbody') tbody: QueryList<any>
  @ViewChild('edit') edit: ElementRef
  isChangesSaved: any = true
  categoryContent: any = [];
  constructor(private _service: UnitcrudService, private _activatedRoute: ActivatedRoute, private _renderer: Renderer2) { }
  search = this._activatedRoute.snapshot.params.search
  defaultformData: any
  formData = new FormGroup({
    uomkey: new FormControl(0),
    uomeCateg: new FormControl(this.search),
    uomeId: new FormControl(""),
    uomeDesc: new FormControl(""),
    uomeCaption: new FormControl(""),
    uomeSysFlg: new FormControl("Y"),
    umcsId: new FormControl(""),
  })

  formDataEdit = new FormGroup({
    uomkey: new FormControl(0),
    uomeCateg: new FormControl(this.search),
    uomeId: new FormControl(""),
    uomeDesc: new FormControl(""),
    uomeCaption: new FormControl(""),
    uomeSysFlg: new FormControl("Y"),
    umcsId: new FormControl(""),
    sysUomeConversions: new FormControl('')
  })
  replaceOnClick(targetIndex: number, id: any) {
    if (this.isChangesSaved) {
      this._service.getSingleUnit(id).subscribe((res) => {
        this.formDataEdit.setValue(res)
      })
      const editFields = this.tbody.first.nativeElement.children[targetIndex + 1]
      const removeRow = this.tbody.first.nativeElement.children[targetIndex]
      const par = this.tbody.first.nativeElement
      let template = this.edit.nativeElement
      this._renderer.removeAttribute(template, 'hidden')
      console.log(this.tbody.first.nativeElement);
      this._renderer.insertBefore(par, template, editFields)
      this._renderer.removeChild(this.tbody.first.nativeElement, removeRow)
      this.isChangesSaved = false
    } else {
      alert('please save changes')
    }
  }

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
        let template = this.edit.nativeElement
        const par = this.tbody.first.nativeElement
        try{this._renderer.removeChild(par, template)}catch{}
      })
  }
  onSaveChanges() {
    this._service.editUnit(this.formDataEdit.get('uomkey')?.value, this.formDataEdit.value).subscribe((res) => {
      this.isChangesSaved = true
      console.log(res);
      this.refreshList(this.search)})
    let template = this.edit.nativeElement
    const par = this.tbody.first.nativeElement
    this._renderer.removeChild(par, template)
  }
  onDeleteUnit(id: number) {
    this._service.deleteUnit(id).subscribe((res) => {
      console.log(res);
      this.refreshList(this.search)
  })}
  refreshList(data: any) {
    this._service.getCategoryUnits(data).subscribe(
      (res) => { this.categoryContent = res }
    )
  }}
