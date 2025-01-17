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
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for learning languages. You provide tips and correct grammar and vocabulary mistakes.' },
        { role: 'user', content: "Me dont knof engrish"}
      ],
      max_tokens: 50,
      temperature: 0.7
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
