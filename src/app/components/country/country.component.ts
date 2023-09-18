import { Component, OnInit } from '@angular/core';
import { Country, CountryService } from 'src/app/services/country.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];
  expanded: boolean = true;
  newCountryName: string=''; //VARIABLE PARA ASIGNAR NUEVO REGISTRO

  constructor(public countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  //LISTAR TODOS LOS PAISES DESDE LA API - REST EN SPRING BOOT
  getCountryList() {
    this.countryService.getCountries().subscribe(
      (data: any) => { 
        this.countries = data.data; // Asigna la matriz de países directamente
      },
      (error) => {
        console.error('Error al obtener la lista de países:', error);
      }
    );
  }

 // CREAR UN NUEVO PAIS -> METODO POST
 addNewCountry(event: any) {
  const newCountryName = event.data.country; // Obtén el nombre del nuevo país
  this.countryService.addCountry(newCountryName).subscribe(
    (response: any) => {
      // El país se ha agregado correctamente, puedes realizar alguna acción adicional si es necesario
      console.log('Nuevo país agregado:', response);

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
  
}


