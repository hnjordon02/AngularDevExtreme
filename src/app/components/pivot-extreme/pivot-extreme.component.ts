import { Component } from '@angular/core';
import { AdventureWorksService, PivotGridDataSource } from 'src/app/services/adventureworks.service';
import * as ExcelJS from 'node_modules/exceljs';
import  saveAs  from 'file-saver';
import { exportPivotGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-pivot-extreme',
  templateUrl: './pivot-extreme.component.html',
  styleUrls: ['./pivot-extreme.component.css']
})
export class PivotExtremeComponent {
  dataSource: PivotGridDataSource;
  
  constructor(service: AdventureWorksService) {
    this.dataSource = service.getPivotGridDataSource();
}
  exportGrid(e:any) {
    const workbook = new ExcelJS.Workbook(); 
    const worksheet = workbook.addWorksheet('Sales'); 

    /*EXPORTAR DEL PIVOTGRID A EXCEL */
    exportPivotGrid({ 
        worksheet: worksheet, 
        component: e.component
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer: BlobPart) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ReportePivotGrid.xlsx"); 
        }); 
    });  
  }

}
