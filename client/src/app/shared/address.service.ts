import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Address } from './address.model';
import { Order } from './order.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()

export class AddressService {
  // form: this.formBuilder.group({
  //   zone: ['', Validators.required],
  //   township: ['', Validators.required],
  //   ward: ['', Validators.required],
  //   street: ['', Validators.required]
  // })
  form: FormGroup = new FormGroup({
    add_id: new FormControl(null),
    zone: new FormControl('', Validators.required),
    township: new FormControl('', [Validators.required]),
    ward: new FormControl('', Validators.required),
    street: new FormControl('', [Validators.required])
  });

  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AddressService')
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>('api/addresses')
      .pipe(
        tap( _ => console.log(`address service: ok`)),
        catchError(this.handleError('getAddresses', []))
      )
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>('api/addresses', address, httpOptions)
      .pipe(
        tap((address: Address) => console.log(`Service: added address ${address}`)),
        catchError(this.myHandleError<Address>('addAddress'))
      )
  }

  searchTownship(query: string): Observable<string[]> {
    const url = `api/search/${query}`;
    return this.http.get<string[]>(url)
      .pipe(
        tap( () => console.log(`Service: search for ${query}`) ),
        catchError(this.myHandleError<string[]>(`searchTownship ${query}`) )
      );
  }


  getYgnAddress() :Observable<any[]>{
    return this.http.get<any[]>('/api/getYgnAddress').pipe(
      // tap( _ => console.log("getYgnAddress serv ok")),
      catchError(this.handleError('getYgnAddress Error', null))      
    );
  }

  
  getYgnTownship():Observable<string[]>{
    return this.http.get<string[]>('api/getYgnTownship')
    .pipe(
      tap( () => console.log('getYgnTownship service ok')  ),
      // catchError(this.handleError('getYgnTownship', []) )      
    );
  }

  getYgnWard( township?:string ):Observable<any[]>{  // ? to accept undefined type
    console.log(`township ${township}`);
    
    return this.http.get<any[]>(`/api/getYgnWard/${township}`)
    .pipe(
      // tap( _ => console.log('getYgnWard serv ok') ),
      catchError( this.handleError('getYgnWard Error', null) )
    );
  }



  private myHandleError<T>(address = 'address', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Service: " + error);
      return of(result as T)
    };
  }


}
