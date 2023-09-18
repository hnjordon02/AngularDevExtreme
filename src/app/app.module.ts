import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { DevExtremeTestComponent } from './components/dev-extreme-test/dev-extreme-test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PivotExtremeComponent } from './components/pivot-extreme/pivot-extreme.component';

import { DxButtonModule, DxDataGridModule, DxPivotGridModule,DxDateRangeBoxModule } from 'devextreme-angular';
import { PaymentsFilmComponent } from './components/payments-film/payments-film.component';
import { CountryComponent } from './components/country/country.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DevExtremeTestComponent,
    DashboardComponent,
    PivotExtremeComponent,
    PaymentsFilmComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxDateRangeBoxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
