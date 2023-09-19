import { Component } from '@angular/core';
import { Payment, paymentService } from 'src/app/services/payments.service';
import * as ExcelJS from 'node_modules/exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-payments-film',
  templateUrl: './payments-film.component.html',
  styleUrls: ['./payments-film.component.css']
})
export class PaymentsFilmComponent {
  pageTitle: string = 'Payments';
  now: Date = new Date();
  startDate: Date = new Date();
  payments: Payment[] = [];
  fechaIni: string = '';
  fechaFin: string = '';
  expanded: boolean = true;

  constructor(private service: paymentService) { }

  // Manejador para el evento onValueChanged del dx-date-range-box
  onDateRangeChanged(event: any) {
    if (event.value) {
      const startDate = event.value[0]?.toISOString()?.slice(0, 10);
      const endDate = event.value[1]?.toISOString()?.slice(0, 10);

      if (startDate && endDate) {
        this.fechaIni = startDate;
        this.fechaFin = endDate;

        //FECHAS ENVIADAS
        console.log('Fecha de inicio:', this.fechaIni);
        console.log('Fecha de fin:', this.fechaFin);

        //HACEMOS LA PETICIONES AL BACKEND
        this.service.enviarFechas(this.fechaIni, this.fechaFin).subscribe((data: Payment[]) => {
          // Respuesta del servidor
          this.payments = data;
          console.log('Response:', this.payments);
        });
      } else {
        // Si una de las fechas es null, borra los valores
        this.fechaIni = '';
        this.fechaFin = '';
      }
    } else {
      // Si no se seleccionaron fechas, borra los valores
      this.fechaIni = '';
      this.fechaFin = '';
    }
  }
  /*ESTE METODO SE VA A QUITAR SOLO ERA DE PRUEBAS*/
  onValueChanged(e: any) {
    console.log(e.value);
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
