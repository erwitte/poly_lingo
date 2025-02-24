import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UiTranslatorService {
  private deeplApiUrl = 'https://api-free.deepl.com/v2/translate';
  private authKey = environment.deeplApiKey;
  private appComponentObject: any;

  constructor(private http: HttpClient) {
  }

  setAppComponentObject(obj: any) {
    this.appComponentObject = obj;
  }

  async translateAppComponentButtons(){
    const chat = await this.translateUi("chat");
    const settings = await this.translateUi("settings");
    this.appComponentObject.translateButtons(chat, settings);
  }

  // @ts-ignore
  async translateUi(text: string): Promise<string> {
    if (localStorage.getItem("userLanguageCode") !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      const body = new URLSearchParams();
      body.set('auth_key', this.authKey);
      body.set('text', text);
      body.set('source_lang', "EN");
      // @ts-ignore
      body.set('target_lang', localStorage.getItem("userLanguageCode").toUpperCase());

      try {
        const response: any = await firstValueFrom(
          this.http.post(this.deeplApiUrl, body.toString(), {headers})
        );
        return response.translations[0].text; // übersetzung
      } catch (error) {
        console.error('Error calling DeepL API:', error);
        // in case of high api usage fault tolerance is used by deepL
        if (error instanceof HttpErrorResponse && error.status === 0){
          console.log("recalling api");
          return this.translateUi(text);
        }
      }
    } else {
      return text;
    }
  }
}
