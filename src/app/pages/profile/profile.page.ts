import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit,OnDestroy {
   times =[
    {
      id:1,
      name: "Morning"
    },
    {
      id:2,
      name: "Day"
    },
    { id: 3,
      name: "Night"
    }]

  userData= {
    fullname:"",
    email:"",
    birthDate:"",
    notificationPreference:[this.times[0].id]
  };

  userDataSubscription: Subscription;
  controlName="notify"

  constructor(private toastController: ToastController, public auth: AuthService) {
   }

  ngOnInit(): void {
    this.userDataSubscription = this.auth.userData$.subscribe(data => {
      if(data){
        console.log(data)
        this.userData = data;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.userDataSubscription.unsubscribe();
  }


  async presentToast(type, message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1600,
      position: 'top',
      color: type,
    });
    await toast.present();
  }

  save(){
    this.auth.UpdateUserData(this.userData);
  }
}
