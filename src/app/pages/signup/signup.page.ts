import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public auth: AuthenticationService, public route: Router, public toast: ToastController) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fullname:["", [Validators.required]],
      email: ["",[Validators.required, Validators.email,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
      password: ["", [Validators.required,
        Validators.pattern("^(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]]
    })
  }

  get errorControl(){
    return this.signupForm?.controls;

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

  async signUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present()
    if(this.signupForm?.valid){

      await this.auth.createUser(this.signupForm.value.email, this.signupForm.value.password).
      then((res)=>{
        loading.dismiss();
        this.route.navigate(["/tabs"])

      }, (err)=>{
        loading.dismiss();
       if(err.code==="auth/email-already-in-use"){
          this.presentToast("danger","Email is already in use!")
        }else{
          this.presentToast("danger", err.code)
        }
      })
    }else{
      loading.dismiss();
      this.presentToast("danger","Please fill out all the required fields")

    }
    this.signupForm.reset();


  }

}

