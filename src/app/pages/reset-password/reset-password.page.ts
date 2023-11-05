import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: any;
  user: any;
  constructor(public auth: AuthenticationService, public route: Router,
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
     const loading = await this.loadingCtrl.create();
      await loading.present();
      await this.auth.resetPassword(this.email).then(async(res)=>{
        this.loadingCtrl.dismiss();
        const alert = await this.alertCtrl.create({
          header: "Success",
          message: "Check your email to reset password",
          "buttons":[{text:'ok', role:'cancel', handler:()=>{this.route.navigateByUrl('login')}}]
        })
        await alert.present();
    },async (err)=>{
        this.loadingCtrl.dismiss();
        if(err.code==="auth/missing-email"){
          this.presentToast("danger", "Please enter the email to send the link")
        }
        else if(err.code==="auth/invalid-email"){
          this.presentToast("danger", "Invalid Email!")
        }else {
          this.presentToast("danger", err.code)
        }
    })
    this.loadingCtrl.dismiss();
    this.email="";

  }



}
