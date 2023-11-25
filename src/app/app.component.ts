import { Component,OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService, public loadingCtrl:LoadingController) {
  }

  userFetching:any

   ngOnInit(){
    this.fetchUser()
  }

  async fetchUser(){
    this.userFetching = await this.loadingCtrl.create();
    await this.userFetching.present()
    const userID = localStorage.getItem("user")

    try {
      await this.auth.getUserData(userID)
      this.userFetching.dismiss()
    } catch (error) {
      this.userFetching.dismiss()
    }
  }
}
