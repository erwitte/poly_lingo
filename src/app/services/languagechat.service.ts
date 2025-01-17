import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguagechatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openAIApiKey;

  constructor(private http: HttpClient) { }

  async callOpenAI() {
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

    this.http.post(this.apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    }).subscribe(
      (response) => {
        console.log('Response from OpenAI:', response);
      },
      (error) => {
        console.error('Error calling OpenAI API:', error);
      }
    )
  }
}
