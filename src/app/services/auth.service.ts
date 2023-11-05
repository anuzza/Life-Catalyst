import { Injectable, NgZone, inject } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData: any; // Save logged in user data
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toast: ToastController,
    public loadingCtrl: LoadingController,
  ) {

    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
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
      .then((result) => {
        loading.dismiss();
        //this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/tabs']);
          }
        });
      })
      .catch((errorr) => {
        loading.dismiss();
        console.log(errorr.message);
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
        const user:User={
          fullName: fullname,
          email:email,
        }

        this.router.navigate(["/tabs"])


        loading.dismiss();

      })
      .catch((error) => {
        loading.dismiss();
        console.log(email);
        console.log(error);

        if(error.code==="auth/email-already-in-use"){
          this.presentToast("danger","Email is already in use!")
        }else{
          this.presentToast("danger", error.code)
        }
      });
  }

  // addUser(user:User){
  //   const collectionInstance= collection(this.firestore, 'users');
  //   addDoc(collectionInstance,user).then(()=>{
  //     console.log("data saved");
  //   }).catch((error)=>{
  //     console.log(error.message);
  //   })
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null? true : false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     fullName: user.displayName,
  //     birthDate: null,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}