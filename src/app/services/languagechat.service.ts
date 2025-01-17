import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguagechatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openAIApiKey;

  constructor(private http: HttpClient) { }

  private async callOpenAI() {
    const data = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for learning languages. You provide tips and correct grammar and vocabulary mistakes. the language in question' +
            'has the code es. Also provide the corrected prompt. Give the tips in language code de.' },
        { role: 'user', content: "Yo querer ir a la playa pero yo no tiene dinero."}
      ],
      max_tokens: 100,
      temperature: 0.5
    };
    return firstValueFrom(this.http.post(this.apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    }));
  }

  async getAiResponse() {
    try {
      const response: any = await this.callOpenAI();
      return response.choices[0].message.content;
    } catch (error) {
      return null;
    }
  }
}
