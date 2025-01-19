import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UiTranslatorService} from "./services/ui-translator.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  chatButton: string = "chat";
  settingsButton = "settings";

  constructor(private router: Router,
              private uiTranslator: UiTranslatorService) {
    this.uiTranslator.setAppComponentObject(this);
  }

  translateButtons(chatButton: string, settingsButton: string): void {
    this.chatButton = chatButton;
    this.settingsButton = settingsButton;
  }

navigateTo(route: string) {
  this.router.navigate([route]);
}

}
