import {AfterViewInit, Component} from '@angular/core';
import { LinguaFrancaService } from '../services/linguafranca.service';
import {LanguagechatService} from "../services/languagechat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false
})
export class ChatPage implements AfterViewInit {
  inputElement: any;
  isDisabled: boolean = false;
  constructor(private languageService: LanguagechatService) { }

  ngAfterViewInit() {
    this.inputElement = document.getElementById('input');
  }
  est: string[] = [];

  async send(){
    const value = this.inputElement.value;
    if (value == "") return;
    this.est.push(value);
    this.isDisabled = true;
    this.inputElement.value = "";
    this.scrollDown();
    const aiResponse = await this.languageService.getAiResponse();
    this.est.push(aiResponse);
    this.isDisabled = false;
    this.scrollDown();
  }

  scrollDown(){
    const listContainer = document.getElementById('container');
    setTimeout(() => {
      // @ts-ignore
      listContainer.scrollTop = listContainer.scrollHeight;
    }, 5); // verzweiflung an auto scroll, nicht schön aber funktioniert
  }
}
