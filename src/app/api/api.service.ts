import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ApiService {

  constructor(private _http: Http, private _jsonp: Jsonp) { }

  /**
   * Sends an asynchronous JSONP request
   */
  public jsonp<T>(url: string): Observable<T> {
    return this._jsonp.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Sends an asynchronous GET request
   */
  public get<T>(url: string): Observable<T> {
    let headers = new Headers({ 
      'Content-Type': 'application/javascript',
    });
    let options = new RequestOptions({ headers: headers });

    return this._http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Sends an asynchronous POST request
   * @type {string}
   */
  public post<T>(url: string, data: T): Observable<T> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(url, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postFormData<T>(requestUrl: string, data: FormData, additionalHeaders?: any): Observable<T> {
    const headers = new Headers(additionalHeaders);
    const options = new RequestOptions({ headers: headers });
    return this._http.post(requestUrl, data, options)
      .map(this._extractData)
      .catch(this._handleError)
      .publishReplay(1)
      .refCount();
  }

  private extractData<T>(res: Response) {
    let body = res.json();
    return <T>body|| <T>{};
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
