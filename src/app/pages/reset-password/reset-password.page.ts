import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: any;
  user: any;
  constructor(public auth: AuthenticationService, public route: Router,
     public toast: ToastController, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
  }

  async presentToast(type, message) {
    const toast = await this.toast.create({
      message: message,
      duration: 1800,
      position: 'top',
      color: type,
    });
    await toast.present();
  }

  async resetPassword(){
     const loading = await this.loadingCtrl.create();
    await loading.present();
      this.auth.resetPassword(this.email).then(()=>{
        this.loadingCtrl.dismiss();
        this.presentToast("success", "Sent reset password link to your email!")
        this.route.navigate(['/login'])
    },(err)=>{
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
