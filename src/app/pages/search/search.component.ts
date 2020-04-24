import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      let keyword = params['keyword'];

      this.search(keyword);
    });
   }

  ngOnInit() {
  }

  search(keyword: string) {

    let url = `${ API_URL }/search/all/${ keyword }`;

    return this.http.get(url).subscribe((response: any) => {
      this.users = response.users;
      this.doctors = response.doctors;
      this.hospitals = response.hospitals;
    });
  }
}
