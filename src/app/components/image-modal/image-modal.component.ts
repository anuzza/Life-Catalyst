import { Component, OnInit,OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent  implements OnInit,OnDestroy {
  @Input('img')img: any;
  @Input('selectedTag')selectedTag: any;


  isFavorited:boolean;
  userDataSubscription: Subscription;

  constructor(private modalCtrl: ModalController,public auth: AuthService) {

  }


  ngOnInit() {
    this.userDataSubscription = this.auth.userData$.subscribe(data => {
      this.isFavorited = data.favorites.find((userImg)=>{
        return userImg.url == this.img.url
      })!==undefined
    });
  }

   ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.userDataSubscription.unsubscribe();
  }

  sliderOptions={
    zoom:true
  };

  async close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async favImage(img){
    await this.auth.storeFavorites(img)
    this.isFavorited = !this.isFavorited

    if (this.isFavorited===false && this.selectedTag=="favorites"){
      this.close()
    }
  }

  async share(){
    try {
      await Share.share({
      url:this.img.url,
    });
    } catch (error) {
      this.auth.presentToast("danger", `${error.message}`)
    }
  }
}
