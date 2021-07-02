import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
import { CustomerServices } from '../../customer-services.service';

interface CustMaster {
  row: string;
  ref_custId: string;
  status: string;
}

@Component({
  selector: 'app-masterdata',
  templateUrl: './masterdata.component.html',
  styleUrls: ['./masterdata.component.scss']
})
export class MasterdataComponent implements OnInit {
  arrayBuffer: any;
  file!: File;
  JSONObject = {
    object: {},
    string: ''
  };


  customer_master!: CustMaster[];
  // customer_master: any = [];
  isData: boolean = false;
  errorMsg: boolean = false;
  constructor(private customerService: CustomerServices) { }

  ngOnInit(): void {
  }

  incomingfile(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const JSON_Object = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this.JSONObject.object = JSON_Object; //Data in JSON Format
      console.log(JSON_Object);
      this.loadCustMaster();
      this.JSONObject.string = JSON.stringify(this.customer_master); //Data in String Format

      console.log('JSON object:', this.JSONObject.object);
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  loadCustMaster() {
    this.customerService.customerMaster(this.JSONObject.object).subscribe(
      (res) => {
        console.log(res);
        let masterData = res;
        // this.customer_master.push(masterData);
        this.customer_master = masterData;
        console.log(this.customer_master);
        this.isData = true;
      },
      (error) => {
        this.errorMsg = !this.errorMsg;
        console.log(error);
      }
    )
  }

}
