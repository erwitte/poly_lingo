import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LanguagechatService} from "../services/languagechat.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false
})
export class ChatPage implements AfterViewInit, OnInit {
  inputElement: any;
  isDisabled: boolean = false;
  constructor(private languageService: LanguagechatService,
              private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit() {
    this.inputElement = document.getElementById('input');
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(() => {
      if (localStorage.getItem('userLanguage') == null || localStorage.getItem('targetLanguage') == null) {
        if (localStorage.getItem('userLanguage') == null) {
          this.conversation.push("set the user's language in settings");
        }
        if (localStorage.getItem('targetLanguage') == null) {
          this.conversation.push("set the target language in settings");
        }
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    });
  }
  conversation: string[] = [];

  async send(){
    const value = this.inputElement.value;
    if (value == "") return;
    this.conversation.push(value);
    this.isDisabled = true;
    this.inputElement.value = "";
    this.scrollDown();
    const aiResponse = await this.languageService.getAiResponse(value);
    this.conversation.push(aiResponse);
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

  clearConversation(){
    this.conversation = [];
  }
}
