import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements ViewWillEnter{
  constructor(private sanitizer: DomSanitizer, public auth: AuthService,
    public router: Router, public route: ActivatedRoute) { }
  // ionViewWillEnter(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ionViewWillLeave(): void {
  //   throw new Error('Method not implemented.');
  // }

  filteredVideos:any=[];
  selectedTag:any="";
  tags=["all","meditation", "motivation", "mindfulness", "breathing"]
  videos= [
    {
      url: "https://www.youtube.com/embed/xv-ejEOogaA",
      tag: "meditation"
    },
    {
      url: "https://www.youtube.com/embed/QTsUEOUaWpY",
      tag: "mindfulness"
    },
    {
      url: "https://www.youtube.com/embed/ru4hdcMmlwQ",
      tag: "meditation"
    },
    {
      url: "https://www.youtube.com/embed/_XLY_XXBQWE",
      tag: "motivation"
    },
    {
      url: "https://www.youtube.com/embed/71_NkXgAK1g",
      tag: "motivation"
    },

    {
      url: "https://www.youtube.com/embed/7Ep5mKuRmAA",
      tag: "breathing"
    },
    {
      url: "https://www.youtube.com/embed/wfDTp2GogaQ",
      tag: "breathing"
    },
    {
      url: "https://www.youtube.com/embed/Ugm0KopaYPo",
      tag: "meditation"
    },
    {
      url: "https://www.youtube.com/embed/2DXqMBXmP8Q",
      tag: "meditation"
    },
    {
      url: "https://www.youtube.com/embed/rO0MT1oPPK4",
      tag: "meditation"
    },
    {
      url: "https://www.youtube.com/embed/bDM4PiTLvT4",
      tag: "meditation"
    },
    {
      url: "https://www.youtube.com/embed/3iUf73v92lI",
      tag: "mindfulness"
    },
    {
      url: "https://www.youtube.com/embed/bLpChrgS0AY",
      tag: "mindfulness"
    },
    {
      url: "https://www.youtube.com/embed/oYdrMpnE93s",
      tag: "mindfulness"
    },
    {
      url: "https://www.youtube.com/embed/NECs97k_8Z4",
      tag: "mindfulness"
    },
    {
      url: "https://www.youtube.com/embed/0QXmmP4psbA",
      tag: "motivation"
    },
     {
      url: "https://www.youtube.com/embed/7CBfCW67xT8",
      tag: "mindfulness"
    },
    {
      url: "https://www.youtube.com/embed/851TxLduWHo",
      tag: "motivation"
    },
    {
      url: "https://www.youtube.com/embed/tgV4YHG-lHE",
      tag: "motivation"
    },
    {
      url: "https://www.youtube.com/embed/tbnzAVRZ9Xc",
      tag: "motivation"
    },
    {
      url: "https://www.youtube.com/embed/ga-MniJxQz8",
      tag: "motivation"
    },
    {
      url: "https://www.youtube.com/embed/8vkYJf8DOsc",
      tag: "breathing"
    },
     {
      url: "https://www.youtube.com/embed/1Dv-ldGLnIY",
      tag: "breathing"
    },
     {
      url: "https://www.youtube.com/embed/-zYnZH7HRYA",
      tag: "breathing"
    },
     {
      url: "https://www.youtube.com/embed/l_NYrWqUR40",
      tag: "motivation"
    },
     {
      url: "https://www.youtube.com/embed/enJyOTvEn4M",
      tag: "breathing"
    },
    {
      url: "https://www.youtube.com/embed/iXUFMndiVxM",
      tag: "motivation"
    },
    {
      url: "https://www.youtube.com/embed/4BmcV--IpNY",
      tag: "breathing"
    },
  ]

  ionViewWillEnter() {
    this.selectedTag=this.route.snapshot.paramMap.get('id')
     if(!this.tags.includes(this.selectedTag)){
      this.select(this.tags[0])
    }
    if(this.selectedTag==="all"){
      this.filteredVideos=[...this.videos];
    }else{
      this.filteredVideos=this.videos.filter((vid)=>vid.tag===this.selectedTag);
    }
  }

  showVideo(video:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(video);
  }

  select(tag:string){
    this.router.navigate([`/tabs/videos/${tag}`])
  }




}
