import { Component, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudserviceService } from 'src/app/services/crudservice.service';
import { Unitformmodel } from 'src/app/shared/unitformmodel.model';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-editunit',
  templateUrl: './editunit.component.html',
  styleUrls: ['./editunit.component.css']
})
export class EditunitComponent implements OnInit {
  @Input() editid = ''
  @Output() saveOnClick = new EventEmitter<string>();

  saveClicked() {
    this.saveOnClick.emit('saving');
  }
  umcsid: any
  constructor(private _service: CrudserviceService, private _activatedRoute: ActivatedRoute) { }
  formdata: Unitformmodel = new Unitformmodel()
  unitForm = new FormGroup({
    uomKey: new FormControl(''),
    uomeCateg: new FormControl(''),
    uomeId: new FormControl(''),
    uomeDesc: new FormControl(''),
    umcsId: new FormControl(''),
    uomeCaption: new FormControl(''),
    uomeSysFlg: new FormControl(''),
  });
  ngOnInit(): void {
    this._service.getUnit(this.editid).subscribe(data => {
      this.umcsid = data.umcsId
      this.unitForm.patchValue({
        uomKey:data.uomKey,
        uomeCateg:data.uomeCateg,
        uomeId:data.uomeId,
        uomeDesc:data.uomeDesc,
        umcsId:data.umcsId,
        uomeCaption:data.uomeCaption,
        uomeSysFlg:data.uomeSysFlg,
      })
    })
  }
  saveChanges() {
    this.formdata = this.unitForm.value
    this.formdata.uomKey = this.editid
    this.formdata.umcsId = this.umcsid
    this._service.editUnit(this.editid, this.formdata).subscribe(data => {
      console.log(data);
      this.saveClicked()
    }, (e) => {
      console.log(e);
    })

  }
}
