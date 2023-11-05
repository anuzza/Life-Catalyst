import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth"
import {AngularFirestoreModule} from "@angular/fire/compat/firestore"

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [AppComponent, ModalComponent, ImageModalComponent],
  imports: [BrowserModule,FormsModule, ReactiveFormsModule, NgSelectModule, AngularFireModule, AngularFireAuthModule,
    AngularFirestoreModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule.forRoot(),AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
