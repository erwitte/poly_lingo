import {Injectable} from '@angular/core';
import {Geolocation} from '@capacitor/geolocation';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LinguaFrancaService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openAIApiKey;

  coordinatesString: string | null = null;

  constructor(private http: HttpClient) { }

  private async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.coordinatesString = `Latitude: ${latitude}, Longitude: ${longitude}`;
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  private async callOpenAI() {
    await this.getCurrentLocation();
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the lingua franca of ' + this.coordinatesString +
        "reply only the language"}
      ],
      max_tokens: 50,
      temperature: 0.1
    };
    return firstValueFrom(this.http.post(this.apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    }));
  }

  async getLanguage() {
    try {
      const response: any = await this.callOpenAI();
      return response.choices[0].message.content;
    } catch (error) {
      return null;
    }
  }
}
