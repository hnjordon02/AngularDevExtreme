import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Country{
    country_id: number,
    country: String,
    lastt_update:String
}

@Injectable({
    providedIn: 'root'
})

export class CountryService {
    private apiUrl = 'http://localhost:9005/api';
    constructor(private http: HttpClient) { }

    getCountries():Observable<any[]> {
        const url = `${this.apiUrl}/country/`;
        return this.http.get<any[]>(url);
    }
}