import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {

  quote:string;

  constructor(private modalCtrl:ModalController,
    public quoteService:QuoteService) { }

  ngOnInit(): void {
    this.fetchQuoteOfTheDay();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  fetchQuoteOfTheDay() {
    this.quoteService.getQuoteOfTheDay().subscribe(
      (data: any) => {
        // Assuming the API response has a property 'quote' containing the quote of the day
        this.quote = data[0];
      },
      (error) => {
        console.error('Error fetching quote:', error);
      }
    );
  }


}
