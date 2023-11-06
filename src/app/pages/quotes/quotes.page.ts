import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from 'src/app/services/quotes.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {

  filteredImages:any=[];
  selectedTag:any="";

  constructor(private modalCtrl: ModalController, private route: ActivatedRoute,
    private router: Router,public qs: QuotesService, public auth: AuthService
) {
    this.selectedTag = this.route.snapshot.paramMap.get("tag");
   }

  ngOnInit() {

    if(this.selectedTag===null){
      this.selectedTag="All";
    }
    this.filter(this.selectedTag);
  }

  images=[
    {
      url: "assets/images/1.jpg",
      tag: "Success",
    },
     {
      url: "assets/images/2.jpg",
      tag: "Anxiety",
    },
     {
      url: "assets/images/3.jpg",
      tag: "Anxiety",
    },
     {
      url: "assets/images/4.jpg",
      tag: "Inspiring",
    },
     {
      url: "assets/images/5.jpg",
      tag: "Success",
    },
     {
      url: "assets/images/6.jpg",
      tag: "Motivation",
    },
     {
      url: "assets/images/7.jpg",
      tag: "Motivation",
    },
     {
      url: "assets/images/8.jpg",
      tag: "Inspiring",
    },
     {
      url: "assets/images/9.jpg",
      tag: "Inspiring",
    },

    {
      url: "assets/images/10.jpg",
      tag: "Motivation",
      isFav: false,
    },

  ]


  tags=["All", "Motivation", "Inspiring", "Anxiety", "Success", "Favorites"]

  getImages(){
    this.qs.getQuotes().subscribe((res)=>{
      console.log(res.data()),
      (err)=>{
        console.log(err);
      };
    })
  }

  async openPreview(img:any){
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      cssClass: 'transparent-modal',
      componentProps:{
        img
      },
    });

    modal.present();
  }


  filter(tag: string){
    this.selectedTag=tag;
    if(tag==="All"){
      this.filteredImages=[...this.images];
    }else if(tag==="Favorites"){
      this.filteredImages = [...this.qs.favorites];
    }
    else{
      this.filteredImages = this.images.filter((img)=>img.tag===tag);
    }
    this.router.navigate(['/tabs/quotes', {tag:this.selectedTag}])
  }

}
