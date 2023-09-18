import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

/*
    Servicio de peticion a WS-REST en Spring Boot.
*/
export interface Payment {
    payment_id: Number,
    fullName: String,
    staff_id: Number,
    rental_id: Number,
    title: String,
    amount: String,
    paymentDate: String
}

@Injectable({
    providedIn: 'root'
})

export class paymentService{

    private apiUrl = 'http://localhost:9005/api';
    constructor(private http: HttpClient) { }

    enviarFechas(fechaIni: String, fechaFin: String): Observable<any> {
        const body = {fechaIni, fechaFin};
        const url = `${this.apiUrl}/`;
        return this.http.post(url,body);
    }
}