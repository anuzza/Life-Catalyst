import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { QuotesPage } from './quotes.page';


const routes: Routes = [
  {
    path: '',
    component: QuotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule,],
  exports: [RouterModule],
})
export class QuotesPageRoutingModule {}
