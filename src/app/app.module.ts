import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { ModalComponent } from './components/modal/modal.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [AppComponent, ModalComponent, ImageModalComponent],
  imports: [BrowserModule,FormsModule, NgSelectModule, IonicModule.forRoot(),AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
