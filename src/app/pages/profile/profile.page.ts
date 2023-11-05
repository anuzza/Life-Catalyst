import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any;
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
  numbers =[1,2,3,4]

  me={
    name: "Anuja Sharma",
    bday: "",
    preferedTimes: [1],
    email:"sharmanuja4@gmail.com"
  }


  constructor(private toastController: ToastController, public auth: AuthenticationService) {
    this.user=this.auth.getProfile();
   }

  ngOnInit(){
    console.log(this.user);


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

  save(){


  }


}
