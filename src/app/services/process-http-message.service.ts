import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMessageService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.status === 404) {
      errMsg = 'Maaf, kata yang anda cari tidak dapat ditemukan.';
    } else {
      errMsg = 'Maaf, terjadi kesalahan jaringan. Pastikan perangkat Anda terhubung ke internet.';
    }
    return throwError(errMsg);
  }

}
