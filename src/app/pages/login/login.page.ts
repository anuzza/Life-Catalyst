import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public auth: AuthenticationService, public route: Router, public toast: ToastController) { }


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
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.loginForm?.valid){
      await this.auth.loginUser(this.loginForm.value.email, this.loginForm.value.password).
      then(()=>{

        this.route.navigate(["/tabs"])
      }, (err)=>{
        loading.dismiss();
        if(err.code==="auth/invalid-login-credentials"){
          this.presentToast("danger","Invalid Credentials!")
        }else{
          this.presentToast("danger", err.code)

        }
      })
    }else{
      loading.dismiss();
      this.presentToast("danger","Please fill out all the required fields")
    }
    this.loginForm.reset();

  }


}
