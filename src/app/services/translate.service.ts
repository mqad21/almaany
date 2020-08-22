import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpMessageService } from './process-http-message.service';
import { catchError } from 'rxjs/operators';
import { Translation } from '../shared/translation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private http: HttpClient,
    private processHttpMessageService: ProcessHttpMessageService,
    @Inject('Constants') private Constants
  ) { }

  getTranslation(searchTerm: String): Observable<Translation[]> {
    return this.http.get<Translation[]>(this.Constants.API_URL + 'search/' + searchTerm)
      .pipe(catchError(this.processHttpMessageService.handleError));
  }

}
