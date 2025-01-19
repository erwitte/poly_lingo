import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  chatButton: string = "chat";
  settingsButton = "settings";

  constructor(private router: Router) {}

navigateTo(route: string) {
  this.router.navigate([route]);
}

}
