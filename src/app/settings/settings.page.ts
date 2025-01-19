import { Component, OnInit } from '@angular/core';
import { LinguaFrancaService } from '../services/linguafranca.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  userLanguage: { name: string; code: string } | null = null; // Object for user language
  targetLanguage: { name: string; code: string } | null = null;
  languages = [
    { name: 'English', code: 'en' },
    { name: 'Mandarin Chinese', code: 'zh' },
    { name: 'Spanish', code: 'es' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Arabic', code: 'ar' },
    { name: 'Bengali', code: 'bn' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Russian', code: 'ru' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Punjabi', code: 'pa' },
    { name: 'German', code: 'de' },
    { name: 'Javanese', code: 'jv' },
    { name: 'Wu Chinese (Shanghainese)', code: 'wuu' },
    { name: 'Malay/Indonesian', code: 'ms' },
    { name: 'Telugu', code: 'te' },
    { name: 'Vietnamese', code: 'vi' },
    { name: 'Korean', code: 'ko' },
    { name: 'French', code: 'fr' },
    { name: 'Turkish', code: 'tr' },
    { name: 'Tamil', code: 'ta' }
  ];

  constructor(private linguaFrancaService: LinguaFrancaService) { }

  ngOnInit() {
    const userLanguageCode = localStorage.getItem('userLanguageCode');
    const userLanguageName = localStorage.getItem('userLanguageName');
    const targetLanguageCode = localStorage.getItem('targetLanguageCode');
    const targetLanguageName = localStorage.getItem('targetLanguageName');

    this.userLanguage = userLanguageCode && userLanguageName
      ? { name: userLanguageName, code: userLanguageCode }
      : null;

    this.targetLanguage = targetLanguageCode && targetLanguageName
      ? { name: targetLanguageName, code: targetLanguageCode }
      : null;
  }

  async setOwnGps() {
    const languageName = await this.linguaFrancaService.getLanguage();
    const language = this.languages.find(lang => lang.name === languageName);

    if (language) {
      this.userLanguage = language;
      console.log("User language:", language);
      localStorage.setItem('userLanguageCode', language.code);
      localStorage.setItem('userLanguageName', language.name);
    }
  }

  async setTargetGps() {
    const languageName = await this.linguaFrancaService.getLanguage();
    const language = this.languages.find(lang => lang.name === languageName);

    if (language) {
      this.targetLanguage = language;
      console.log("Target language:", language);
      localStorage.setItem('targetLanguageCode', language.code);
      localStorage.setItem('targetLanguageName', language.name);
    }
  }

  onTargetLanguageChange() {
    if (this.targetLanguage) {
      localStorage.setItem('targetLanguageCode', this.targetLanguage.code);
      localStorage.setItem('targetLanguageName', this.targetLanguage.name);
    }
  }

  onUserLanguageChange() {
    if (this.userLanguage) {
      localStorage.setItem('userLanguageCode', this.userLanguage.code);
      localStorage.setItem('userLanguageName', this.userLanguage.name);
    }
  }
}
