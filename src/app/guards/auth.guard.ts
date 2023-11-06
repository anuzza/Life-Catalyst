import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    public auth: AuthService
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      // const user = await this.afAuth.currentUser;
      // const isAuthenticated = user ? true : false;
      // if (!isAuthenticated) {
      //   this.router.navigate(["/login"])
      // }
      // return isAuthenticated;

      if(localStorage.getItem("user")===null){
        this.router.navigate(["/login"])
        return false;
      }else{
        return true;
      }

  }


}