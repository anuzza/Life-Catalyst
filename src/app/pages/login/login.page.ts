import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public route: Router, public toast: ToastController, public auth:AuthService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["",[Validators.required, Validators.email,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
      password: ["", [Validators.required,
        Validators.pattern("^(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]]
    })
  }

  get errorControl(){
    return this.loginForm?.controls;

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

  async login(){
    if(this.loginForm?.valid){
          await this.auth.SignIn(this.loginForm.value.email, this.loginForm.value.password)
    }else{
      this.presentToast("danger","Please fill out all the required fields")
    }
    this.loginForm.reset();
  }



}
