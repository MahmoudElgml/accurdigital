import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudserviceService } from 'src/app/services/crudservice.service';
import { Unitformmodel } from 'src/app/shared/unitformmodel.model';

@Component({
  selector: 'app-editunit',
  templateUrl: './editunit.component.html',
  styleUrls: ['./editunit.component.css']
})
export class EditunitComponent implements OnInit {
  @Input() editid = ''
  umcsid:any
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
    const id = this._activatedRoute.snapshot.params.id
    this._service.getUnit(this.editid).subscribe(data => {
      this.umcsid=data.umcsId

      console.log(data);
       this.unitForm.setValue(data)
    })
  }
  saveChanges() {

    this.formdata = this.unitForm.value
    this.formdata.uomKey=this.editid
    this.formdata.umcsId=this.umcsid
    console.log(this.formdata);
    
    this._service.editUnit(this.editid, this.formdata).subscribe(data => {
      console.log(data);
    }, (e) => {
      console.log(e);
    })
  }
}