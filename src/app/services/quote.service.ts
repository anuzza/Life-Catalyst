import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const apiUrl=`https://zenquotes.io/api/today/${environment.APIKey}`;
@Injectable({
  providedIn: 'root'
})

export class QuoteService {
  constructor(private http: HttpClient) {
  }

  getQuoteOfTheDay(): Observable<any> {
    return this.http.get(apiUrl);
  }
}

