import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  public alertButtons = ['OK'];

  constructor(private toastController: ToastController,
    private modalCtrl: ModalController, public route: Router, public auth: AuthService ) {}

  ngOnInit() {
    this.openModal();
  }

  message="hellol"

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

  async logout(){
    this.auth.SignOut();
  }
}
