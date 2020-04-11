import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit() {
    this.markAsCurrentTheme();
  }

  changeTheme(theme: string, link: any) {
    this.putAsCurrentTheme(link);
    this.settings.applyTheme(theme);
  }

  putAsCurrentTheme(link: any) {
    let selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  markAsCurrentTheme() {
    let selectors: any = document.getElementsByClassName('selector');
    let theme = this.settings.settings.theme;

    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') == theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
