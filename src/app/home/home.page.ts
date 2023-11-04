import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  public alertButtons = ['OK'];

  constructor(private toastController: ToastController,private modalCtrl: ModalController ) {}

  ngOnInit() {
   // this.presentToast('top');
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
}
