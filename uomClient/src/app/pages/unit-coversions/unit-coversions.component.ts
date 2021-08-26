import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudserviceService } from 'src/app/services/crudservice.service';
import { Unitformmodel } from 'src/app/shared/unitformmodel.model';

@Component({
  selector: 'app-unit-coversions',
  templateUrl: './unit-coversions.component.html',
  styleUrls: ['./unit-coversions.component.css']
})
export class UnitCoversionsComponent implements OnInit {
// @Input() unitid:any=''
allunits:any[]=[]
currentunit:any
unitid:any=this._activatedRoute.snapshot.params.id
  constructor(private _service:CrudserviceService,private _activatedRoute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this._service.getAllUnits().subscribe((res)=>{
      this.allunits=res
      this.allunits.splice(this.allunits.findIndex(i=>i.uomkey==this.unitid),1)
    })
    
    this._service.getSingleUnit(this.unitid).subscribe((res)=>{
      this.currentunit=res
      console.log(res);
      
    })

  }
  formdata: Unitformmodel = new Unitformmodel()
  unitForm = new FormGroup({
    uomKey: new FormControl(0),
    fromUomkey: new FormControl(this.unitid),
    toUomkey: new FormControl(''),
    uomBaseNbr: new FormControl(''),
    uomOffsetNbr: new FormControl(),
    uomNumeratorNbr: new FormControl(''),
    uomDenominatorNbr: new FormControl(''),
  });
  addNewConversion(){

  }

}
