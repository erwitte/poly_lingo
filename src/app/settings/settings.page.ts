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
  selectOneText: string | null = "select one";

  userLanguage: { name: string; code: string } | null = null; // Object for user language
  targetLanguage: { name: string; code: string } | null = null;
  languages = [
    { name: 'Arabic', code: 'ar' },
    { name: 'Bulgarian', code: 'bg' },
    { name: 'Czech', code: 'cs' },
    { name: 'Danish', code: 'da' },
    { name: 'German', code: 'de' },
    { name: 'Greek', code: 'el' },
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' },
    { name: 'Estonian', code: 'et' },
    { name: 'Finnish', code: 'fi' },
    { name: 'French', code: 'fr' },
    { name: 'Hungarian', code: 'hu' },
    { name: 'Indonesian', code: 'id' },
    { name: 'Italian', code: 'it' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Korean', code: 'ko' },
    { name: 'Lithuanian', code: 'lt' },
    { name: 'Latvian', code: 'lv' },
    { name: 'Norwegian Bokmål', code: 'nb' },
    { name: 'Dutch', code: 'nl' },
    { name: 'Polish', code: 'pl' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Romanian', code: 'ro' },
    { name: 'Russian', code: 'ru' },
    { name: 'Slovak', code: 'sk' },
    { name: 'Slovenian', code: 'sl' },
    { name: 'Swedish', code: 'sv' },
    { name: 'Turkish', code: 'tr' },
    { name: 'Ukrainian', code: 'uk' },
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
    this.selectOneText = await this.uiTranslator.translateUi("select one");
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
