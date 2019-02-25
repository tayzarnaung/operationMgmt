import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs'
import {catchError} from 'rxjs/operators'

import {Order} from './order.model'
import { HttpErrorHandler, HandleError} from './http-error-handler.service'

@Injectable()
export class CustomerService {

  private handleError: HandleError

  constructor(private http:HttpClient, httpErrorHandler: HttpErrorHandler){
      this.handleError = httpErrorHandler.createHandleError('OrderService')
  }

  getCustomers(): Observable<Order[]>{
      return this.http.get<Order[]>('api/customers')
          .pipe(catchError(this.handleError('getCustomers',[])))
  }

  addCustomer(order :Order): Observable<Order>{
      return this.http.post<Order>('api/orders', order)
          .pipe(catchError(this.handleError('addOrder',order)))
  }

//   deleteOrder(id:number):Observable<{}>{
//       const url = `api/orders/${id}`

//       return this.http.delete(url)
//           .pipe(catchError(this.handleError('deleteOrder')))
//   }


//   updateOrder(order: Order): Observable<Order>{
//       return this.http.put<Order>('api/order/${order.id}', order)
//           .pipe(catchError(this.handleError('updateOrder', order)))    
//   }
}
