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

  private async callOpenAI(message: string) {
    const data = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful conversation partner for learning languages. ' +
            'You provide tips and correct grammar and vocabulary mistakes. the target language' +
            'is ' + localStorage.getItem("targetLanguage") +
            '. Also provide the corrected prompt if there is something to correct. Give the tips in language ' + localStorage.getItem("userLanguage") +
        ". Lead a conversation in the target language with the user besides your other task."},
        { role: 'user', content: message}
      ],
      max_tokens: 200,
      temperature: 0.8
    };
    return firstValueFrom(this.http.post(this.apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    }));
  }

  async getAiResponse(message: string) {
    console.log("target: " + localStorage.getItem("targetLanguage") + " user: " + localStorage.getItem("userLanguage"));
    try {
      const response: any = await this.callOpenAI(message);
      return response.choices[0].message.content;
    } catch (error) {
      return null;
    }
  }
}
