import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudserviceService } from 'src/app/services/crudservice.service';

@Component({
  selector: 'app-unit-coversions',
  templateUrl: './unit-coversions.component.html',
  styleUrls: ['./unit-coversions.component.css']
})
export class UnitCoversionsComponent implements OnInit {
  allunits: any[] = []
  currentunit: any
  unitid: any = this._activatedRoute.snapshot.params.id
  constructor(private _service: CrudserviceService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getAllUnits().subscribe((res) => {
      console.log(res);

      this.allunits = res
      this.allunits.splice(this.allunits.findIndex(i => i.uomkey == this.unitid), 1)
    })

    this._service.getSingleUnit(this.unitid).subscribe((res) => {
      console.log(res);
      this.currentunit = res
    })
  }
  unitForm = new FormGroup({
    uomKey: new FormControl(0),
    fromUomkey: new FormControl(Number(this.unitid)),
    toUomkey: new FormControl(),
    uomBaseNbr: new FormControl(1),
    uomOffsetNbr: new FormControl(1),
    uomNumeratorNbr: new FormControl(1),
    uomDenominatorNbr: new FormControl(1),
    conversionFormula: new FormControl(1),
  });
  addNewConversion() {
    this._service.addConversion(this.unitForm.value).subscribe(
      (res) => {
        console.log(res)
      },
      (e) => console.log(e)
    )
  }
}
