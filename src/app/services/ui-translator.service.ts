import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UiTranslatorService {
  private deeplApiUrl = 'https://api-free.deepl.com/v2/translate';
  private authKey = environment.deeplApiKey;

  constructor(private http: HttpClient) {
  }

  async translateUi(text: string): Promise<string | null> {
    if (localStorage.getItem("userLanguageCode") !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      const body = new URLSearchParams();
      body.set('auth_key', this.authKey);
      body.set('text', text);
      body.set('source_lang', "en".toUpperCase());
      // @ts-ignore
      body.set('target_lang', localStorage.getItem("userLanguageCode").toUpperCase());

      try {
        const response: any = await firstValueFrom(
          this.http.post(this.deeplApiUrl, body.toString(), {headers})
        );
        return response.translations[0].text; // Return the translated text
      } catch (error) {
        console.error('Error calling DeepL API:', error);
        return null;
      }
    } else {
      return text;
  }
}
}
