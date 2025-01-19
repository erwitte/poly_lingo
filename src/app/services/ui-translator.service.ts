import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiTranslatorService {
  private deeplApiUrl = 'https://api-free.deepl.com/v2/translate';
  private authKey = 'ac3e3234-4c3a-4dfa-aed8-5124a50c72c6:fx';

  constructor(private http: HttpClient) { }

  async translateText(text: string, targetLang: string): Promise<string | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('auth_key', this.authKey);
    body.set('text', text);
    body.set('source_lang', "en".toUpperCase());
    body.set('target_lang', targetLang.toUpperCase());

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.deeplApiUrl, body.toString(), { headers })
      );
      return response.translations[0].text; // Return the translated text
    } catch (error) {
      console.error('Error calling DeepL API:', error);
      return null;
    }
  }
}
