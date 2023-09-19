import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Country{
    country_id: number,
    country: string,
    last_update:String
}

@Injectable({
    providedIn: 'root'
})

export class CountryService {
    private apiUrl = 'http://localhost:9005/api';
    constructor(private http: HttpClient) { }

    getCountries(): Observable<any[]> {
        const url = `${this.apiUrl}/country/`;
        return this.http.get<any[]>(url);
    }

    addCountry(countryName: string): Observable<any> {
        const url = `${this.apiUrl}/country/newCountry`;
        const newCountry = {country: countryName};
        return this.http.post(url,newCountry);
    }

    updateCountry(id: number, countryName: string): Observable<any> {
        const url = `${this.apiUrl}/country/${id}`;
        const updateCountry = { country: countryName };
        return this.http.put(url, updateCountry);
      }
      
}