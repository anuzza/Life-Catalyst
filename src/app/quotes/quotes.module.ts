import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotesPageRoutingModule } from './quotes-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { QuotesPage } from './quotes.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    IonicModule,
    QuotesPageRoutingModule,
  ],
  declarations: [QuotesPage]
})
export class QuotesPageModule {}
