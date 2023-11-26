import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import {AngularFireAuthModule, USE_EMULATOR} from "@angular/fire/compat/auth"

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {StorageModule} from "@angular/fire/storage";
import { FirebaseAppModule, getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {FirestoreSettings, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore} from "@angular/fire/firestore";
import {HttpClientModule, HttpClientJsonpModule} from "@angular/common/http";
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, ModalComponent, ImageModalComponent],
  imports: [BrowserModule,FormsModule, ReactiveFormsModule, NgSelectModule, HttpClientModule, HttpClientJsonpModule,
FirebaseAppModule, AngularFireAuthModule, AngularFireModule,BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule.forRoot(),
    StorageModule,
    provideFirestore(() =>
        initializeFirestore(getApp(), {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        })
      ),
 AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
