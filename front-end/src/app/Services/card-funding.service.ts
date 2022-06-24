import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardFundingService {
  private url = 'http://localhost:3033/user/addUserCard';
  constructor(private httpClient: HttpClient) {}

  addCardFunding(cardInfo: any) {
    return this.httpClient.post<any>(this.url, cardInfo);
  }
}
