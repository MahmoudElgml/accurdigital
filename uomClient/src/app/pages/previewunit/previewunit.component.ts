import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CrudserviceService } from 'src/app/services/crudservice.service';

@Component({
  selector: 'app-previewunit',
  templateUrl: './previewunit.component.html',
  styleUrls: ['./previewunit.component.css']
})
export class PreviewunitComponent implements OnInit,OnChanges {
 
  @Input() unitid = '';
  data:any
  constructor(private _service:CrudserviceService) { }

  ngOnInit(): void {
    this._service.getUnit(this.unitid).subscribe((res)=>{
      this.data=res
    },(e)=>{
      console.log(e);
    }
    )
  }
  ngOnChanges() {
     console.log(this.unitid);
    }   
   

}
