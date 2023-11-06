import { Injectable, NgZone, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as uuid from 'uuid';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    // /* Saving user data in localstorage when
    // logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getUserData(user).then(()=>{
        })
      }
    });
  }

  async presentToast(type, message) {
    const toast = await this.toast.create({
      message: message,
      duration: 1600,
      position: 'top',
      color: type,
    });
    await toast.present();
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        loading.dismiss();
        this.getUserData(result.user).then(()=>{
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              localStorage.setItem('user', this.userData?.uid)
              this.router.navigate(['/tabs']);
            }
          });
        })
      }) .catch((errorr) => {
        loading.dismiss();
        if(errorr.code==="auth/invalid-login-credentials"){
          this.presentToast("danger","Invalid Credentials!")
        }else{
          this.presentToast("danger", errorr.code)
        }
      });
  }
  // Sign up with email/password
  async SignUp(fullname: string, email: string, password: string) {
    const loading = await this.loadingCtrl.create();
    await loading.present();


    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const new_user ={
          uid:result.user.uid,
          email: email,
          fullname:fullname,
          birthDate: "",
          notificationPreference: [1],
        }
        this.afs.collection('users').
        doc("user_"+result.user.uid).set(new_user).then(()=>{
          this.userData=new_user;
          loading.dismiss();

        }).then(()=>{
          localStorage.setItem('user', this.userData?.uid)
          this.router.navigate(["/tabs"])
        })

      })
      .catch((error) => {
        loading.dismiss();

        if(error.code==="auth/email-already-in-use"){
          this.presentToast("danger","Email is already in use!")
        }else{
          this.presentToast("danger", error.code)
        }
      });
  }

  // Reset Forgot password
  async  ForgotPassword(passwordResetEmail: string) {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then( async () => {
        this.loadingCtrl.dismiss();
        const alert = await this.alertCtrl.create({
          header: "Success",
          message: "Check your email to reset password",
          "buttons":[{text:'ok', role:'cancel', handler:()=>{this.router.navigateByUrl('login')}}]
        })
        await alert.present();
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        if(error.code==="auth/missing-email"){
          this.presentToast("danger", "Please enter the email to send the link")
        }
        else if(error.code==="auth/invalid-email"){
          this.presentToast("danger", "Invalid Email!")
        }else {
          this.presentToast("danger", error.code)
        }
      });
  }
  // Returns true when user is logged in
  isLoggedIn() {
    return !!localStorage.getItem("user");
  }


 getUserData(user:any) {
     return this.afs.firestore.collection('users').doc("user_"+user.uid).get().then(
      (doc)=>{
        this.userData=doc.data();
      }
     )
  }


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}