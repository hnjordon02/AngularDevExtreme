import { Component, OnInit } from '@angular/core';
import { Country, CountryService } from 'src/app/services/country.service';
import notify from 'devextreme/ui/notify';
import * as ExcelJS from 'node_modules/exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit { 
  pageTitle: string = 'COUNTRY-LIST';
  countries: Country[] = [];
  expanded: boolean = true; 
  newCountryName: string=''; //VARIABLE PARA ASIGNAR NUEVO REGISTRO
  selectedCountry: Country | null = null; // País seleccionado para la edición

  constructor(public countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  //LISTAR TODOS LOS PAISES DESDE LA API - REST EN SPRING BOOT
  getCountryList() {
    this.countryService.getCountries().subscribe(
      (data: any) => { 
        this.countries = data.data; 
      },
      (error) => {
        console.error('Error al obtener la lista de países:', error);
        notify({ 
          message: `Ha ocurrido un error: ${error.message}`, // Concatena el mensaje de error original
          width: 300, 
          shading: true 
        },"error",3500);
      }
    );
  }

 // CREAR UN NUEVO PAIS -> METODO POST
 addNewCountry(event: any) {
  const newCountryName = event.data.country; // Obtén el nombre del nuevo país
  this.countryService.addCountry(newCountryName).subscribe(
    (response: any) => {
      // El país se ha agregado correctamente
      console.log('Nuevo país agregado:', response);
      notify({ 
        message:'Datos registrados',
        width: 300, 
      },"success",3500);

      // Vuelve a cargar la lista de países para mostrar el nuevo país en la tabla
      this.getCountryList();
    },
    (error) => {
      console.error('Error al agregar el país:', error);
    }
  );
  // Limpia el campo del nombre del nuevo país después de agregarlo
  this.newCountryName = '';
}

  //ACTUALIZAR DESDE EL FRONT
  handleRowEdit(event: any) {
    const updatedCountry = event.data;
    // Asegúrate de que estás obteniendo los datos correctos para la actualización
    console.log('País seleccionado para actualizar:', updatedCountry);
  
    this.countryService.updateCountry(updatedCountry.country_id, updatedCountry.country).subscribe(
      (response: any) => {
        // País actualizado con éxito
        console.log('País actualizado:', response);
        //REGISTRO AGREGADO
        notify({ 
          message:'Datos actualizados exitosamente',
          width: 300, 
        },"success",3500);
        //FIN DE ALERTA
        // Vuelve a cargar la lista de países para mostrar los cambios en la tabla
        this.getCountryList();
  
        // Limpia la selección del país después de la actualización
        this.selectedCountry = null;
      },
      (error) => {
        console.error('Error al actualizar el registro:', error);
      }
    );
  }

  //EXPORTAR DATOS DEL GRID
  exportGrid(e:any) {
    if(e.format === 'xlsx'){
      const workbook = new ExcelJS.Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer:any) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "CountryReport.xlsx"); 
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


