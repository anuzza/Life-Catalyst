import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit,OnDestroy {
  userData: any;
  userDataSubscription: Subscription;

  constructor(private authService: AuthService, private modalCtrl:ModalController) { }

  ngOnInit(): void {
    this.userDataSubscription = this.authService.userData$.subscribe(data => {
      this.userData = data;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.userDataSubscription.unsubscribe();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
