import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  showVideo(video:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(video);
  }

  videos= [
    {
      url: "https://www.youtube.com/embed/xv-ejEOogaA",
      tag: "Meditation"
    },
    {
      url: "https://www.youtube.com/embed/QTsUEOUaWpY",
      tag: "Meditation"
    },
    {
      url: "https://www.youtube.com/embed/ru4hdcMmlwQ",
      tag: "Meditation"
    },
    {
      url: "https://www.youtube.com/embed/_XLY_XXBQWE",
      tag: "Meditation"
    },
    {
      url: "https://www.youtube.com/embed/71_NkXgAK1g",
      tag: "Meditation"
    },

    {
      url: "https://www.youtube.com/embed/7Ep5mKuRmAA",
      tag: "Meditation"
    },
    {
      url: "https://www.youtube.com/embed/wfDTp2GogaQ",
      tag: "Meditation"
    },
  ]

}