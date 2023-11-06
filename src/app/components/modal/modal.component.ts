import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController, public auth: AuthService) {
   }

  ngOnInit() {
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }





}
