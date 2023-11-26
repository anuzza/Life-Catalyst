import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { QuoteService } from 'src/app/services/quote.service';


interface QuoteData{
  quote:string
  author:string
  date: Date
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  quote:QuoteData;

  constructor(private modalCtrl:ModalController,
    public quoteService:QuoteService,private storage:Storage, public auth:AuthService) {

     }

  async ngOnInit() {
    await this.storage.create()
    await this.fetchQuoteOfTheDay();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async fetchQuoteOfTheDay() {
    const today = new Date()
    const quoteData:QuoteData = await this.storage.get("quote")
    if(quoteData?.date.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
      this.quote = quoteData
    }else{
      this.quoteService.getQuoteOfTheDay().subscribe(
        async (data: any) => {
          const quote = data[0]
          const quoteData = {
            quote:quote.q,
            author:quote.a,
            date:today
          }
          await this.storage.set("quote",quoteData)
          this.quote = quoteData
      },
        (error) => {
          this.auth.presentToast('danger', "Unable to fetch quote of the day!");
        }
      );
    }
}
}
