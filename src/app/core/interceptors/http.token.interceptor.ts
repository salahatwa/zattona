import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Configuration } from '../models/configuration';
import { CustomHttpUrlEncodingCodec } from '../models/models';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  public configuration = new Configuration();
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'Cache-Control': 'no-cache',
      // 'Access-Control-Allow-Origin': '*'
    };
    headersConfig['Accept-Language'] = `en`;
    headersConfig['Content-Encoding'] = `gzip`;

    let queryParameters = req?.params;

    // authentication (Access key from header) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["API-Authorization"]) {
      headersConfig['API-Authorization'] = this.configuration.apiKeys["API-Authorization"];
    }

    // authentication (Access key from query) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["api_access_key"]) {
      if (!queryParameters)
        queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
      queryParameters = queryParameters.set('api_access_key', this.configuration.apiKeys["api_access_key"]);
    }


    const request = req.clone({ setHeaders: headersConfig, withCredentials: false, params: queryParameters });

    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            this.handleAuthError();
            return of(err);
          } else if (err.status === 404) {
            this.router.navigate(["/404"]);
          }
          throw err;
        }
      )
    );
  }
  private handleAuthError() {
    this.router.navigateByUrl('/');
  }
}
