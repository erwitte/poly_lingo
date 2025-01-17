import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LinguaFrancaService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openAIApiKey;

  latitude: number | null = null;
  longitude: number | null = null;

  coordinatesString: string | null = null;

  constructor(private http: HttpClient) { }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.coordinatesString = `Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  async getLinguaFranca(){
    await this.getCurrentLocation();
  }

  async callOpenAI() {
    await this.getCurrentLocation();
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the lingua franca of ' + this.coordinatesString +
        "reply only the language code"}
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
