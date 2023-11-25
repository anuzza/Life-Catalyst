import { Component } from '@angular/core';
import { LoadingController, ModalController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  animations:[
    trigger("todoItemAnim",[
      transition(":leave",[
        animate(1000,style({
          opacity:0,
        }))
      ])
    ])
  ]
})
export class QuotesPage implements ViewWillEnter,ViewWillLeave {
  tags=["change", "confidence", "inspiration", "success", "failure","life","anxiety","favorites"]
  filteredImages:any=[];
  selectedTag:any="";
  userDataSubscription: Subscription;
  favorites:any=[];
  imagesFetched=false

  constructor(private loadingCtrl: LoadingController,private modalCtrl: ModalController, public auth: AuthService, public route: ActivatedRoute, public router: Router,private http: HttpClient) {
  }

  async fetchImages(tag:string, ){
    if(!this.imagesFetched){
      const loading = await this.loadingCtrl.create();
      await loading.present();
       await this.http.get(
            `https://images-api-omega.vercel.app/images/${tag}`)
            .subscribe((response)=>{
              if (response) {
                this.filteredImages = response;
              }
        })
      await loading.dismiss()
      this.imagesFetched = true
    }
  }

  ionViewWillEnter() {
    this.selectedTag=this.route.snapshot.paramMap.get('id')
     if(!this.tags.includes(this.selectedTag)){
      this.select(this.tags[0])
    }

     this.userDataSubscription = this.auth.userData$.subscribe(data => {
       if(data){
          this.favorites = data.favorites
        }
      switch(this.selectedTag){
        case "favorites":
          this.filteredImages= [...this.favorites]
          return
        default:
          this.fetchImages(this.selectedTag)
          return
        }
     })
  }

  ionViewWillLeave(): void {
       // Unsubscribe to avoid memory leaks
    this.userDataSubscription.unsubscribe();
  }

  async openPreview(img:any){
    const selectedTag = this.selectedTag
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      cssClass: 'transparent-modal',
      componentProps:{
        img,
        selectedTag
      },
    });

    modal.present();
  }

  select(tag: string){
    this.router.navigate([`/tabs/quotes/${tag}`])
  }
}
