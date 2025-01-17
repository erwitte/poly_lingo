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
  constructor(private languageService: LanguagechatService) { }

  ngAfterViewInit() {
    this.inputElement = document.getElementById('input');
  }
  est: string[] = [];

  async send(){
    const value = this.inputElement.value;
    console.log('Input value:', value);
    this.est.push(value);
    this.inputElement.value = "";
    this.scrollDown();
    this.languageService.callOpenAI();
  }

  scrollDown(){
    const listContainer = document.getElementById('container');
    setTimeout(() => {
      // @ts-ignore
      listContainer.scrollTop = listContainer.scrollHeight;
    }, 5); // verzweiflung an auto scroll, nicht schön aber funktioniert
  }
}
