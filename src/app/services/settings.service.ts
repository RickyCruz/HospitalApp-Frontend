import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  }

  constructor(@Inject(DOCUMENT) private document) {
    this.loadTheme();
  }

  saveTheme() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadTheme() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));

      this.applyTheme(this.settings.theme);
    } else {
      this.applyTheme(this.settings.theme);
    }
  }

  applyTheme(theme: string) {
    let url = `assets/css/colors/${theme}.css`;

    this.document.getElementById('theme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveTheme();
  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}
