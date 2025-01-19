import { Component, OnInit } from '@angular/core';
import { LinguaFrancaService } from '../services/linguafranca.service';
import {UiTranslatorService} from "../services/ui-translator.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  yourLanguageHeading: string | null = "Your language: -";
  targetLanguageHeading: string | null = "Target language: -";
  setByGpsButton: string | null = "set by gps";
  chooseALanguageText: string | null = "choose a language";

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

  constructor(private linguaFrancaService: LinguaFrancaService,
              private uiTranslator: UiTranslatorService) { }

  ngOnInit() {
    const userLanguageCodeStartUp = localStorage.getItem('userLanguageCode');
    const userLanguageNameStartUp = localStorage.getItem('userLanguageName');
    const targetLanguageCodeStartUp = localStorage.getItem('targetLanguageCode');
    const targetLanguageNameStartUp = localStorage.getItem('targetLanguageName');

    this.userLanguage = userLanguageCodeStartUp && userLanguageNameStartUp
      ? { name: userLanguageNameStartUp, code: userLanguageCodeStartUp }
      : null;

    this.targetLanguage = targetLanguageCodeStartUp && targetLanguageNameStartUp
      ? { name: targetLanguageNameStartUp, code: targetLanguageCodeStartUp }
      : null;
  }

  async translateUi(){
    this.yourLanguageHeading = await this.uiTranslator.translateUi("Your Language: " + this.userLanguage?.name);
    this.targetLanguageHeading = await this.uiTranslator.translateUi("Your Language: " + this.targetLanguage?.name);
    this.setByGpsButton = await this.uiTranslator.translateUi("set by gps");
    this.chooseALanguageText = await this.uiTranslator.translateUi("choose a language");
  }

  async setOwnGps() {
    const languageName = await this.linguaFrancaService.getLanguage();
    const language = this.languages.find(lang => lang.name === languageName);

    if (language) {
      this.userLanguage = language;
      console.log("User language:", language);
      localStorage.setItem('userLanguageCode', language.code);
      localStorage.setItem('userLanguageName', language.name);
      await this.translateUi();
      this.uiTranslator.translateAppComponentButtons()
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
      this.targetLanguageHeading = await this.uiTranslator.translateUi("Your Language: " + this.targetLanguage?.name);
    }
  }

  async onTargetLanguageChange() {
    if (this.targetLanguage) {
      localStorage.setItem('targetLanguageCode', this.targetLanguage.code);
      localStorage.setItem('targetLanguageName', this.targetLanguage.name);
      this.targetLanguageHeading = await this.uiTranslator.translateUi("Your Language: " + this.targetLanguage?.name);
    }
  }

  onUserLanguageChange() {
    if (this.userLanguage) {
      localStorage.setItem('userLanguageCode', this.userLanguage.code);
      localStorage.setItem('userLanguageName', this.userLanguage.name);
      this.translateUi();
      this.uiTranslator.translateAppComponentButtons()
    }
  }
}
