import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit() {
  }

  changeTheme(theme: string, link: any) {
    let url = `assets/css/colors/${theme}.css`;

    this.markAsCurrentTheme(link);

    this._document.getElementById('theme').setAttribute('href', url);
  }

  markAsCurrentTheme(link: any) {
    let selectors:any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}
