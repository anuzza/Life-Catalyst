import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public alertButtons = ['OK'];
  userData: any;
  userDataSubscription: Subscription;

  constructor(private auth: AuthService,private toastController: ToastController,
    private modalCtrl: ModalController, public route: Router ) {}

  ngOnInit() {
    this.userDataSubscription = this.auth.userData$.subscribe(data => {
      this.userData = data;
    });
     this.openModal()
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'Welcome to LifeCatalyst!',
    duration: 500,
    position: position,
    color: "success",
    animated:true
  });

  await toast.present();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'modal-class'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.userDataSubscription.unsubscribe();
  }

  async logout(){
    this.auth.signOut();
  }

}
