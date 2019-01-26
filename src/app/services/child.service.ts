import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildService extends BaseService {
  
  private readonly API_CHILD = `${environment.BASE_URL}doctor`

  constructor(
    protected http: HttpClient
  ) { super(http); }

  getChild(Id: String) : Observable<any> {
    const url = `${this.API_CHILD}/${Id}/20/0/childs?searchKeyword=`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

}
