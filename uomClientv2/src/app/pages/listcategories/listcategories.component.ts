import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitcrudService } from 'src/app/services/unitcrud.service';

@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent implements OnInit {

  constructor(private _service: UnitcrudService) { }
  categoriesData: any = [];
  defaultformData: any
  formData = new FormGroup({
    uomkey: new FormControl(0),
    uomeCateg: new FormControl('', [Validators.required, this.noWhitespaceValidator, this.noDuoblicateCategory.bind(this)]),
    uomeId: new FormControl(""),
    uomeDesc: new FormControl(""),
    uomeCaption: new FormControl(""),
    uomeSysFlg: new FormControl("N"),
    umcsId: new FormControl("")
  })
  ngOnInit(): void {
    this.refreshCategories()
    this.defaultformData = this.formData.value
    console.log(this.categoriesData.findIndex((x: any) => x.uomeCateg == "metric"))
  }

  addCategoryOnSubmit() {
    if (!this.uomeCateg?.errors) {
      this._service.addUnit(this.formData.value).subscribe(
        (res) => {
          this.formData.reset(this.defaultformData);
          console.log(res)
          this.categoriesData.push(this.formData.value)
    })}
  }

  refreshCategories() {
    this._service.getCategories().subscribe(
      (res) => { this.categoriesData = res }
  )}

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  public noDuoblicateCategory(control: FormControl) {
    const isDublicate = this.categoriesData.findIndex((x: any) => x.uomeCateg == control.value) === -1
    return isDublicate ? null : { 'dublicated': true };
  }
  get uomeCateg() { return this.formData.get('uomeCateg') }
}
