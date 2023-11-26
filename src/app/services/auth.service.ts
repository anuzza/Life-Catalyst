import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userData$: Observable<any> = this.userDataSubject.asObservable();

   private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();


  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
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

    try {
      const {user:{uid}} = await this.afAuth
      .signInWithEmailAndPassword(email, password)
      await this.getUserData(uid)
      loading.dismiss();
      this.router.navigate(['/tabs']);
    } catch (error) {
       loading.dismiss();
        if(error.code==="auth/invalid-login-credentials"){
          this.presentToast("danger","Invalid Credentials!")
        }else{
          this.presentToast("danger", error.code)
        }
    }

  }
  // Sign up with email/password
  async SignUp(fullname: string, email: string, password: string) {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async(result) => {
        const newUser ={
          uid:result.user.uid,
          email: email,
          fullname:fullname,
          birthDate: "",
          notificationPreference: [1],
          favorites:[],
        }
        await this.afs.collection('users').
        doc("user_"+result.user.uid).set(newUser).then(()=>{
          this.userDataSubject.next(newUser)
          this.isAuthenticatedSubject.next(true)
          loading.dismiss();
          localStorage.setItem('user', this.userDataSubject.value.uid)
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

 async getUserData(userID:any) {
    try {
      const userJSON = await this.afs.firestore.collection('users').doc("user_"+userID).get()
      const user = await userJSON.data();
      if(!user){
        throw new Error("user not found")
      }
      this.userDataSubject.next(user);
      this.isAuthenticatedSubject.next(true)
      localStorage.setItem('user',this.userDataSubject.value.uid)
    } catch (err) {
      this.presentToast("danger", err.message)
    }
  }


  async UpdateUserData(user){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.afs.collection('users').
        doc("user_"+user.uid).set(user).then(()=>{
          this.userDataSubject.next(user);
          this.isAuthenticatedSubject.next(true)
        }).then(()=>{
          loading.dismiss();
          this.presentToast("success", "Profile Updated Successfully")
        }).catch((error)=>{
          loading.dismiss();
          this.presentToast("err", error.code)
        })
  }

  async storeFavorites(image){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const currentUser=this.userDataSubject.value
    try {
      const user = await this.afs.collection("users").doc("user_"+currentUser.uid)
      if(currentUser.favorites.find((img)=>img.id===image.id)){
        await user.update({
          favorites:arrayRemove(image)
        })

      }else{
         await user.update({
          favorites:arrayUnion(image)
        })
      }

      this.getUserData(currentUser.uid)
      loading.dismiss();
    } catch (error) {
      loading.dismiss();
      this.presentToast("err", error.message)
    }
  }

  // Sign out
  async signOut() {
    await this.afAuth.signOut()
    this.userDataSubject.next(null);
    this.isAuthenticatedSubject.next(false)
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}