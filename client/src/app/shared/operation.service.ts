import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable, of } from 'rxjs';
import { Operation } from './operation.model';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}



@Injectable({
  providedIn: 'root'
})
export class OperationService {
   hi: String ="hi from operation";
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OperationService')
  }

  getOperation(): Observable<Operation[]> {
    return this.http.get<Operation[]>('api/operation')
      .pipe(catchError(this.handleError('getOperation', [])));
  }


  // addOrder(order: Order){
  //     console.log("Service" + order.cpeType)
  //     return order;
  // }

  addOperation(operation: Operation): Observable<Operation> {
    return this.http.post<Operation>('api/operation', operation, httpOptions)
      .pipe(
        tap((operation: Operation) => console.log(`Service: added operation ${operation}`)),
        catchError(this.myHandleError<Operation>('addOperation'))
      );
  }


  private myHandleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
