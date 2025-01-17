import { Component, OnInit } from '@angular/core';
import { LinguaFrancaService } from '../services/linguafranca.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {

  constructor(private liinguaFrancaService: LinguaFrancaService) { }

  ngOnInit() {
  }

  async setOwnGps(){
    const languageCode = await this.liinguaFrancaService.getLanguageCode();
  }

  async setTargetGps(){
    const languageCode = await this.liinguaFrancaService.getLanguageCode();
  }
}
