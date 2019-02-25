import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'

import { Order } from './order.model'
import { HttpErrorHandler, HandleError } from './http-error-handler.service'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private handleError: HandleError;
    orderForm: Order;

    // public orderForm: Order = { 'order_id':null,orderPoster:'', planType:'', cpeType:'', useType:'', how_u_know:'',
    // 'orderChannel':'', 'remark':'', status:'', 'toInstall':null}

    // orderForm= this.formBuilder.group({
    //     order_id: ['', Validators.required],
    //     orderPoster: ['', Validators.required, Validators.minLength(3)],
    //     planType: ['', Validators.required],
    //     cpeType: ['', Validators.required],
    //     useType: ['', Validators.required],
    //     orderChannel: ['', Validators.required],
    //     how_u_know: ['', Validators.required],
    //     remark: ['', Validators.required],
    //     toInstall: ''  //toInstall: [''];
    //   })
    // orderForm: FormGroup = new FormGroup({   //object
    //     order_id: new FormControl(null),
    //     orderPoster: new FormControl('', Validators.required),
    //     planType: new FormControl('', [Validators.required]),
    //     cpeType: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //     useType: new FormControl('', [Validators.required]),
    //     orderChannel: new FormControl('', Validators.required),
    //     how_u_know: new FormControl('', Validators.required),
    //     remark: new FormControl('', Validators.required),
    //     toInstall: new FormControl('', Validators.required),
    //     status: new FormControl('', Validators.required),
    //   });

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private formBuilder: FormBuilder) {
        this.handleError = httpErrorHandler.createHandleError('OrderService')
    }

    populateOrder(order: Order) {
        this.orderForm = order;
        // this.orderForm.patchValue(order);
        console.log("populate", this.orderForm);
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>('api/orders')
            .pipe(catchError(this.handleError('getOrders', [])))
    }

    getOrder(order_id: number): Observable<Order> {
        return this.http.get<Order>(`api/orders/${order_id}`)
            .pipe(
                // tap(_ => console.log("Service ok: at id=" + order_id)),
                catchError(this.handleError<Order>('getOrder'))
            );
    }

    getAllOrderIds(): Observable<string[]> {
        return this.http.get<string[]>('api/myorders/getAllOrderIds')
            .pipe(
                // tap(_ => console.log("Service ok:")),
                catchError(this.handleError('getAllOrderIds', []))
            );
    }

    updateStatus(order_id: number, status: string): Observable<Order> {
        // console.log(order_id , status);

        return this.http.get<Order>(`api/updateStatus/${order_id}/${status}`)
            .pipe(
                tap(() => console.log('service ok' + order_id + status)),
                catchError(this.handleError<Order>('uupdateStatus'))
            );
    }


    addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>('api/orders', order, httpOptions)
            .pipe(
                tap((order: Order) => console.log(`Service: added order/ id=${order.order_id}`)),
                catchError(this.myHandleError<Order>('addOrder'))
            );
    }

    // addOrder(order: Order){
    //     console.log("Service" + order.cpeType)
    //     return order;
    // }

    deleteOrder(id: number): Observable<{}> {
        const url = `api/orders/${id}`

        return this.http.delete(url)
            .pipe(catchError(this.handleError('deleteOrder')))
    }


    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>('api/order/${order.id}', order)
            .pipe(catchError(this.handleError('updateOrder', order)))
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
