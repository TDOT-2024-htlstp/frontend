import {effect, Injectable, signal} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private internalCoins = signal(0);
  public readonly coins = this.internalCoins.asReadonly();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    effect(async () => {
      await this.loadCoins()
    });
  }

  async loadCoins() {
    let response = await firstValueFrom(this.httpClient.get<{
      points: number
    }>(`https://schnitzeljagd.if.htlstp.ac.at/api/public/user/points/${this.authService.getUserId()}`, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + "ce4a8484-e95f-4967-84dc-a2a510e0ff20",
      })
    }))

    this.internalCoins.set(response.points)
  }

  async chargePoints(coins: number) {
    await firstValueFrom(this.httpClient.post<{
      points: number
    }>(`https://schnitzeljagd.if.htlstp.ac.at/api/public/user/withdraw`, {
      "userId": this.authService.getUserId(),
      "points": coins
    }, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + "ce4a8484-e95f-4967-84dc-a2a510e0ff20",
      })
    }))
  }
}
