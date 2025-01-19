import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LanguagechatService} from "../services/languagechat.service";
import {ActivatedRoute} from "@angular/router";
import {UiTranslatorService} from "../services/ui-translator.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false
})
export class ChatPage implements AfterViewInit, OnInit {
  inputElement: any;
  isDisabled: boolean = false;

  clearConversationButton: string | null = "clear conversation";
  sendButton: string | null = "send";

  constructor(private languageService: LanguagechatService,
              private activatedRoute: ActivatedRoute,
              private uiTranslator: UiTranslatorService,) { }

  ngAfterViewInit() {
    this.inputElement = document.getElementById('input');
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(async () => {
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
        this.clearConversationButton = await this.uiTranslator.translateUi("clear conversation");
        this.sendButton = await this.uiTranslator.translateUi("send");
      }
    });
  }
  conversation: string[] = [];

  async translateUi(){

  }

  async send(){
    // const a: any = await this.uiTranslator.translateText("Your language:", "es");
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
    }, 5); // ohne time out wird nur zum vorletzten eintrag des arrays gescrollt
  }

  clearConversation(){
    this.conversation = [];
  }
}
