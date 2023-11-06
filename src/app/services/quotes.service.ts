import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(public http: HttpClient) { }

  private url:string = "http://zenquotes.io/api/quotes/"+environment.apiKey



  favorites:any=[];

  addFav(img){
    if(this.favorites.includes(img)){
      this.favorites=this.favorites.filter((image)=>image.url !=img.url)
    }else{
      this.favorites=[...this.favorites, img];
    }
  }


 getQuotes():Observable<any>{
    return this.http.get(this.url, {
        headers:
          new HttpHeaders(
            {
              'Access-Control-Allow-Origin': "*",
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

            }
          )
      });
  }
}
