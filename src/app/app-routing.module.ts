import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevExtremeTestComponent } from './components/dev-extreme-test/dev-extreme-test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PivotExtremeComponent } from './components/pivot-extreme/pivot-extreme.component';
import { PaymentsFilmComponent } from './components/payments-film/payments-film.component';
import { CountryComponent } from './components/country/country.component';

const routes: Routes = [
  {path: 'devextreme-test', component: DevExtremeTestComponent},
  {path: 'main', component: DashboardComponent},
  {path: 'pivot-table', component: PivotExtremeComponent},
  {path: 'payments', component:PaymentsFilmComponent},
  {path: 'country', component:CountryComponent},
  {path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
