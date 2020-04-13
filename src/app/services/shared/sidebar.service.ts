import { Injectable } from '@angular/core';

export class SidebarService {
  menu: any = [
    {
      title: 'General',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgressBar', url: '/progress' },
        { title: 'Charts', url: '/charts-one' },
        { title: 'Settings', url: '/account-settings' },
      ]
    },
  ];

  constructor() { }
}
