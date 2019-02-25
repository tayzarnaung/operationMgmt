import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Address } from './address.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Operation } from './operation.model';
import { Order } from './order.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TempAddressService {

  private handleError: HandleError;
  verifyOperation: Operation;

  // form = this.formBuilder.group({
  //   add_id: null,
  //   zone: ['', Validators.required],
  //   township: ['', Validators.required],
  //   ward: ['', [Validators.required, Validators.minLength(3)]],
  //   street: ['', Validators.required]
  // });
  form: FormGroup = new FormGroup({   //object
    add_id: new FormControl(null),
    zone: new FormControl('', Validators.required),
    township: new FormControl('', [Validators.required]),
    ward: new FormControl('', [Validators.required, Validators.minLength(3)]),
    street: new FormControl('', [Validators.required]),
  });

  orderForm : Order;

  initializeFormGroup() {
    this.form.setValue({ add_id: null, zone: '', township: '', ward: '', street: '' })
  }


  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private formBuilder: FormBuilder) {
    this.handleError = httpErrorHandler.createHandleError('AddressService')
  }

  populateForm(address: Address, row: Operation) {
    // console.log('address',address);

    // this.form.patchValue(row);    //setValue

    this.form.patchValue(address);    //setValue
    // this.form.patchValue({         //setValue
    //   add_id: address.add_id,
    //   zone: address.zone,
    //   township:address.township,
    //   ward:address.ward,
    //   street:address.street
    // })

    this.verifyOperation = row;
  }

  populateOrder(order : Order){
    this.orderForm = order;
  }


  getTempAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>('api/tempAddresses')
      .pipe(
        tap(_ => console.log(`address service: ok`)),
        catchError(this.handleError('getTempAddresses', []))
      )
  }

  addTempAddress(address: Address): Observable<Address> {
    return this.http.post<Address>('api/tempAddresses', address, httpOptions)
      .pipe(
        tap((address: Address) => console.log(`Service: added address ${address}`)),
        catchError(this.myHandleError<Address>('addTempAddress'))
      )
  }

  tempAddressVerify(address: Address): Observable<Operation> {
    for (let key in address)
      this.verifyOperation[key] = address[key]
    this.verifyOperation['status'] = 'ready';
    this.verifyOperation['verify'] = true;

     return this.http.post<Operation>('api/tempAddressVerify', this.verifyOperation)
      .pipe(
        tap(_ => console.log(`address verify service: ok`)),
        catchError(this.handleError('tempAddressVerify', this.verifyOperation))
      );
  }

  searchTownship(query: string): Observable<string[]> {
    const url = `api/search/${query}`;
    return this.http.get<string[]>(url)
      .pipe(
        tap(() => console.log(`Service: search for ${query}`)),
        catchError(this.myHandleError<string[]>(`searchTownship ${query}`))
      );
  }


  private myHandleError<T>(address = 'address', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Service: " + error);
      return of(result as T)
    };
  }
}
