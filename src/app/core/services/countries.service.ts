import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface CountriesResponse<T> {
  error: boolean;
  msg: string;
  data: T[];
}
export interface CountriesDialCodesData {
  name: string;
  code: string;
  dial_code: string;
}
export interface CountriesAndCitiesData {
  country: string;
  cities: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _apiUrl = 'https://countriesnow.space/api/v0.1/countries';
  private _httpClient = inject(HttpClient);

  getCountriesDialCodes(): Observable<CountriesDialCodesData[]> {
    return this._httpClient
      .get<CountriesResponse<CountriesDialCodesData>>(this._apiUrl + '/codes')
      .pipe(map((response) => (response.error ? [] : response.data)));
  }

  getCountriesAndCities(): Observable<{ country: string; cities: string[] }[]> {
    return this._httpClient
      .get<CountriesResponse<CountriesAndCitiesData>>(this._apiUrl)
      .pipe(map((response) => (response.error ? [] : response.data)));
  }
}
