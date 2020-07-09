import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SaveAddressService {

  constructor(
    private http: HttpClient,
  ) { }

  saveAddress(formData): Observable<any> {
    return this.http.post('https://developetests.com/api/saveAddress',
    formData,
    )
    .map((response: Response) => {
      return response;
    });
  }
}
