import { Component, OnInit } from '@angular/core';
import { Country, CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];
  expanded: boolean = true;

  constructor(public countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  //LISTAR TODOS LOS PAISES DESDE LA API - REST EN SPRING BOOT
  getCountryList() {
    this.countryService.getCountries().subscribe(
      (data: Country[]) => { 
        this.countries = data;
      },
      (error) => {
        console.error('Error al obtener la lista de países:', error);
      }
    );
  }
}

