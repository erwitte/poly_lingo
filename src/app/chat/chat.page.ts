import {AfterViewInit, Component} from '@angular/core';
import { LinguaFrancaService } from '../services/linguafranca';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false
})
export class ChatPage implements AfterViewInit {
  inputElement: any;
  constructor(private linguaFrancaService: LinguaFrancaService) { }

  ngAfterViewInit() {
    this.inputElement = document.getElementById('input');
  }
  est: string[] = [];

  send(){
    const value = this.inputElement.value;
    console.log('Input value:', value);
    this.est.push(value);
    this.inputElement.value = "";
    this.scrollDown();
    this.linguaFrancaService.callOpenAI();
  }

  scrollDown(){
    const listContainer = document.getElementById('container');
    setTimeout(() => {
      // @ts-ignore
      listContainer.scrollTop = listContainer.scrollHeight;
    }, 5); // verzweiflung an auto scroll, nicht schön aber funktioniert
  }
}
