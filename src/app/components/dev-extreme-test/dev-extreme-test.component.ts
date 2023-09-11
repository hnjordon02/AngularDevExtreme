import { Component } from '@angular/core';
import { Employee, EmployeesService } from 'src/app/services/employees.service';
import * as ExcelJS from 'node_modules/exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-dev-extreme-test',
  templateUrl: './dev-extreme-test.component.html',
  styleUrls: ['./dev-extreme-test.component.css']
})
export class DevExtremeTestComponent {

  employees: Employee[] = [];
  selectedEmployee: Employee | undefined;
  expanded: boolean = true;

  constructor(service: EmployeesService) {
    this.employees = service.getEmployees();
    this.selectEmployee = this.selectEmployee.bind(this);
  }
  
  helloWorld() {
    alert('DevExpress is works!');
  }
  /*SELECTED EMPLOYE ON DATAROW*/
  selectEmployee(e:any) {
    e.component.byKey(e.currentSelectedRowKeys[0]).done((employee:any) => {
        if(employee) {
            this.selectedEmployee = employee;
        }
    });
}
  /*EXPORTAR EN ARCHIVO DE EXCEL LA DATA PUESTA EN EL GRID CON DEVEXPRESS */
   exportGrid(e:any) {
    if(e.format === 'xlsx'){
      const workbook = new ExcelJS.Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer:any) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Reporte.xlsx"); 
        }); 
      }); 
      e.cancel = true;

    } else if (e.format === 'pdf'){
        const doc = new jsPDF();
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('DataGrid.pdf');
        });
    }

  } 

}


