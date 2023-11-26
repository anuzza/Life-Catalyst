import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private apiUrl=`https://zenquotes.io/api/today/${environment.APIKey}`;

  constructor(private http: HttpClient) { }

  getQuoteOfTheDay(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
