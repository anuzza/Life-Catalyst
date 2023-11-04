import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent  implements OnInit {

  @Input('img')img: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  sliderOptions={
    zoom:true
  };

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  //capacitor share: temporary link for now
  //actual url will be fetched from the api
  async share(){

    await Share.share({
      url:'https://media.istockphoto.com/id/1417433518/photo/pine-tree-forest-on-a-hill-desktop-background.jpg?s=1024x1024&w=is&k=20&c=0RIgbgqrlXqJw6Kw_zRJaQN2BtCfwSVfGL0uyHrIBk0=',
    });
  }

  love(){
    this.img.isFav =!this.img.isFav;

  }

}
