import { Component } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

 function getImages(tag:string){
    const imagesArr =[]
    for(let i=0;i<20;i++){
   imagesArr.push({
           tag,
    url:`https://zenquotes.io/api/image/${environment.imageAPIKey}&keyword=${tag}?${i}`
        })
    }
    return imagesArr
  }

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
export class QuotesPage implements ViewWillEnter {
  tags=["change", "confidence", "inspiration", "success", "failure","life","anxiety","favorites"]
  filteredImages:any=[];
  favoriteImages:any=[];
  selectedTag:any="";
  user:any;

  constructor(private modalCtrl: ModalController, public auth: AuthService, public route: ActivatedRoute, public router: Router) {
    this.selectedTag=this.route.snapshot.paramMap.get('id')
  }

  ionViewWillEnter() {
    if (!this.selectedTag){
      this.selectedTag = this.tags[0]
    }

    this.filteredImages = getImages(this.selectedTag)
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


  filter(tag: string){
    this.selectedTag=tag;
    this.router.navigate([`/tabs/quotes/${this.selectedTag}`])
    switch (tag){
      case "favorites":
        this.filteredImages = this.auth.userData?.favorites || AsyncPipe;
        return
      default:
        this.filteredImages=getImages(this.selectedTag)
        return
    }
  }
}
