import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: any;
  user: any;
  constructor(public auth: AuthService, public route: Router,
     public toast: ToastController, public loadingCtrl: LoadingController,
     public alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  async presentToast(type, message) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: type,
    });
    await toast.present();
  }

  async resetPassword(){
    await this.auth.ForgotPassword(this.email);
    this.email="";

  }



}
