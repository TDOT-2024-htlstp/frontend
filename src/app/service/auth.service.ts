import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public  userId: WritableSignal<string|undefined> = signal(undefined);

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  loadAuthData() {
    let param = this.route.snapshot.queryParams["userId"];
    let local = localStorage.getItem("userId");

    console.log(param)

    if (param) {
      this.userId = param;
      localStorage.setItem("userId", this.userId()!)
    } else if (local) {
      this.userId.set(local);
    }

  }

  isAuthenticated(): boolean {
    return this.userId !== undefined;
  }

  async authenticate() {
    let response = await firstValueFrom(this.http.get<{value: string}>(`https://schnitzeljagd.if.htlstp.ac.at/api/auth/createRedirectUri?state=${window.crypto.randomUUID()}&redirect_uri=https://htlstp.ac.at`))
    window.location.assign(response.value)
  }

  getUserId(): string {
    return this.userId()!;
  }
}
