import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit() {
  }

  changeTheme(theme: string, link: any) {
    this.markAsCurrentTheme(link);
    this.settings.applyTheme(theme);
  }

  markAsCurrentTheme(link: any) {
    let selectors:any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}
