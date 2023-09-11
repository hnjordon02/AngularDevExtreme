import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { DevExtremeTestComponent } from './components/dev-extreme-test/dev-extreme-test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PivotExtremeComponent } from './components/pivot-extreme/pivot-extreme.component';

import { DxButtonModule, DxDataGridModule, DxPivotGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DevExtremeTestComponent,
    DashboardComponent,
    PivotExtremeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxPivotGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
