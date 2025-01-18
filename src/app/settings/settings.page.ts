import { Component, OnInit } from '@angular/core';
import { LinguaFrancaService } from '../services/linguafranca.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  userLanguage: string | null = null;
  targetLanguage: string | null = null;
  languages:string[] = [
    'English',
    'Mandarin Chinese',
    'Spanish',
    'Hindi',
    'Arabic',
    'Bengali',
    'Portuguese',
    'Russian',
    'Japanese',
    'Punjabi',
    'German',
    'Javanese',
    'Wu Chinese (Shanghainese)',
    'Malay/Indonesian',
    'Telugu',
    'Vietnamese',
    'Korean',
    'French',
    'Turkish',
    'Tamil',
    'Italian',
    'Urdu',
    'Gujarati',
    'Thai',
    'Persian (Farsi)',
    'Polish',
    'Ukrainian',
    'Dutch',
    'Swedish',
    'Hungarian'
  ];

  constructor(private linguaFrancaService: LinguaFrancaService) { }

  ngOnInit() {
    this.userLanguage = localStorage.getItem('userLanguage');
    this.targetLanguage = localStorage.getItem('targetLanguage');
  }

  async setOwnGps(){
    this.userLanguage = await this.linguaFrancaService.getLanguage();
    localStorage.removeItem('userLanguage');
    if (this.userLanguage != null) {
      localStorage.setItem('userLanguage', this.userLanguage);
    }
  }

  async setTargetGps(){
    this.targetLanguage = await this.linguaFrancaService.getLanguage();
    localStorage.removeItem("targetLanguage");
    if (this.targetLanguage != null) {
      localStorage.setItem('targetLanguage', this.targetLanguage);
    }
  }

  onTargetLanguageChange(event: any) {
    localStorage.removeItem("targetLanguage");
    if (this.targetLanguage != null) {
      localStorage.setItem("targetLanguage", this.targetLanguage);
    }
  }

  onUserLanguageChange(event: any) {
    localStorage.removeItem("userLanguage");
    if (this.userLanguage != null) {
      localStorage.setItem("userLanguage", this.userLanguage);
    }
  }
}
