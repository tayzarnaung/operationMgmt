import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';

// - - - - - - - - - - -  Service - - - - - - - - - - -
import { ToastrService } from 'ngx-toastr'

import { OrderService } from 'src/app/shared/order.service';
import { CustomerService } from 'src/app/shared/customer.service';
import { AddressService } from 'src/app/shared/address.service';
import { OperationService } from 'src/app/shared/operation.service';

import { Address } from 'src/app/shared/address.model';
import { Observable, of, Subject, empty } from 'rxjs';
import { startWith, map, switchMap, debounceTime, tap, catchError } from 'rxjs/operators';
import { Order } from 'src/app/shared/order.model';
import { Router } from '@angular/router';
import { TemplateParseResult } from '@angular/compiler';

@Component({
  selector: 'app-yangon',
  templateUrl: './yangon.component.html',
  styleUrls: ['./yangon.component.css'],
  providers: [CustomerService, AddressService, OrderService]
})

export class YangonComponent implements OnInit {

  registrationForm: FormGroup = this.fb.group({

    customerForm: this.fb.group({
      cname: ['', Validators.required],
      ph1: ['', Validators.required],
      ph2: ['', Validators.required],
      houseNo: ['', Validators.required],
      floor_room: ['', Validators.required]
    }),

    addressForm: this.fb.group({
      zone: ['', Validators.required],
      township: ['', Validators.required],
      ward: ['', Validators.required],
      street: ['', Validators.required]
    }),

    orderForm: this.fb.group({
      order_id: ['', Validators.required],
      orderPoster: ['', [Validators.required, Validators.minLength(3)]],
      planType: ['', Validators.required],
      cpeType: ['', Validators.required],
      useType: ['', Validators.required],
      orderChannel: ['', Validators.required],
      how_u_know: ['', Validators.required],
      remark: ['', Validators.required],
      toInstall: ''  //toInstall: [''];
    })

  });     //registrationForm : FormBuilder

  initializeRegForm() {
    console.log('hi');
    
    this.registrationForm.patchValue( {
        'customerForm': { 'cname': '', 'ph1': '', 'ph2':'','houseNo':'', 'floor_room':''},
        'addressForm': {'zone':'', 'township':'', 'ward':'', 'street':''},
        "orderForm": {"order_id":"", 'orderPoster':'', 'planType':'', 'cpeType':'', 'useType':'', 'orderChannel':'', 'how_u_know':'', 'remark':'', 'toInstall':''}
      } );
  }

  planType = ['1.7Mbps', '2.5Mbps', '3.5Mbps', '5.5Mbps', 'Prepaid']
  cpeType = ['Fixed', 'Mini', 'Mini with Antenna', 'Mini to Mini with Antenna', 'Fix to Mini']
  useType = ['Home', 'Business', 'Hotel']
  orderChannel = ['Phone', 'Facebook', 'Store', 'SBS Ground Sale', 'CPE Sale', 'Reseller', 'OPI Sale', 'BI Sale', 'Billing']
  how_u_know = ['Facebook', 'Store', 'Sale', 'Friends', 'Flyer', 'Reseller']
  zone = ['A', 'B', 'C', 'D', 'E']

  orders: Order[]; order_ids: string[] = []; order_id_exist: string;
  addresses: Address[];
  townshipCol: string[] = []; wardCol: string[] = []; streetCol: string[] = [];
  autoTownship: Observable<string[]>; autoWard: Observable<string[]>; autoStreet: Observable<string[]> = null;


  // - - - - - - - - - - -  End declaration - - - - - - - - - - -
  // - - - - - - - - - - -  Construtor - - - - - - - - - - -
  constructor(
    private fb: FormBuilder, private router: Router, private toastr: ToastrService,
    private operationService: OperationService,
    private customerService: CustomerService, private addressService: AddressService, private orderService: OrderService
  ) { }


  ngOnInit() {
  
    // this.addressService.getAddresses().subscribe(addresses => {
    //   this.addresses = addresses  //object

    //   console.log("component   " + JSON.stringify(this.addresses));
    //   console.log("component   " + typeof (this.addresses[0]['township']));  //string type

    //   for (var i = 0, j = this.addresses.length; i < j; i++) {

    //     if (!this.townshipCol.includes(this.addresses[i]['township']) && /*null!=*/this.addresses[i]['township'])
    //       this.townshipCol.push(this.addresses[i]['township']);

    //     if (!this.wardCol.includes(this.addresses[i]['ward']))
    //       this.wardCol.push(this.addresses[i]['ward']);

    //     if (!this.streetCol.includes(this.addresses[i]['street']))
    //       this.streetCol.push(this.addresses[i]['street']);
    //   }
    //   // console.log( typeof this.townshipCol ,  typeof(this.townshipCol[0])); //object & string
    //   console.log("Township: ", this.townshipCol);
    //   console.log("Ward:", this.wardCol.toString()); console.log("Street:", this.streetCol);
    // },
    //   err => console.log("getAddresses Com:", err)
    // );

    this.addressService.getYgnAddress().subscribe(addresses => {
      if (addresses) {
        this.addresses = addresses  //object

        console.log(" getYgnAddress Com:  ", this.addresses);  //object
        // console.log(typeof this.addresses['township']); //object
        // console.log(" getYgnAddress Com: ", this.addresses['township'][0]['name']); //string

        // for (let property in this.addresses)    console.log(property);    //township, ward, street     
        // console.log(  Object.keys(this.addresses) ); //object type    //['township', 'ward', 'street'] 

        // console.log( Object.values(this.addresses) );
        // console.log( Object.values(this.addresses['township']) );

        // console.log(Object.entries(this.addresses));    //key/value pairs

        for (let i = 0, j = this.addresses['township'].length; i < j; i++)
          if (!this.townshipCol.includes(this.addresses['township'][i]['name']) && /*null!=*/this.addresses['township'][i]['name'])
            this.townshipCol.push(this.addresses['township'][i]['name']);


        for (let i = 0; i < this.addresses['ward'].length; i++)
          if (!this.wardCol.includes(this.addresses['ward'][i]['name']))
            this.wardCol.push(this.addresses['ward'][i]['name']);


        for (let i = 0; i < this.addresses['street'].length; i++)
          if (!this.streetCol.includes(this.addresses['street'][i]['name']))
            this.streetCol.push(this.addresses['street'][i]['name']);

      }
    },
      err => console.log("getYgnAddress Com:", err)
    );

    // this.addressService.getYgnTownship().subscribe(township => { //object
    //   // this.townshipCol = township;    //will get object
    //   // typeof(this.townshipCol[0])  // object {name:"Insein"}
    //   // typeof this.townshipCol[0]['name']  // string Insein
    //   for (let i in township)
    //     this.townshipCol.push(township[i]['name'])
    //     console.log(this.townshipCol, typeof this.townshipCol);  //object        
    // })

    // this.addressService.getYgnWard(this.townshipFn.value? this.townshipFn.value : null).subscribe(ward => {
    //   // for (let i = 0; i < ward.length; i++)
    //   for (let i = 0, j = ward.length; i < j; i++)
    //     this.wardCol.push(ward[i]['name'])
    // },
    //   (err: string) => console.log("getYgnWardError", err),
    //   () => console.log("Complete State", this.wardCol)
    // );
    // console.log("wardCol" , this.wardCol);  //  []


    this.orderService.getAllOrderIds().subscribe(order_ids => {    //object
      // this.order_ids = order_ids;    //object  
      for (let key in order_ids) this.order_ids.push(order_ids[key])   //object
      // console.log("all order_id Compo:", this.order_ids, typeof (this.order_ids));

      // var tempArr:Object = {};
      // Object.keys(order_ids).forEach( key => {
      //   console.log("key/value pair: " , key ,   order_ids[key]  );       
      //   tempArr['name'] = [ order_ids[key] ]
      // })
      // console.log(tempArr);
      // console.log(typeof(tempArr['name']));  //object
    }); //end subscribe


    this.order_idFn.valueChanges.subscribe(
      value => {
        if(value == ''){this.order_id_exist = '' /*or null*/};

        if (value && value.trim() != '') {  //work if not space
          this.order_id_exist = '';

          for (let i = 0; i < this.order_ids.length; i++) {
            let id = this.order_ids[i]; //numb1er

            if (id != null) id = id.toString();

            if (id === this.order_idFn.value) {
              this.order_id_exist = `order id ${id} already exists`;
              break;    //break for loop 
            }
            // console.log( this.order_ids[i] );        
          } //end for
        }
      });
    //- - - - - - - - -  Order Id already exist ? - - - - - - - - - 

    this.matAutocomplete();
  } //end ngOnInit


  private matAutocomplete() {
    // this.townshipFn.valueChanges.subscribe(  value => {console.log(value)} );

    this.autoTownship = this.townshipFn.valueChanges
      .pipe(
        startWith(''), debounceTime(300),
        map(value => {
          if (value!=null && value.trim() !== '' && this.townshipCol) {

            const filterValue = value.toLowerCase();

            return this.townshipCol.filter(townshipCol =>
              townshipCol.toLowerCase().includes(filterValue)
            );
          } else return null;
        })
      );

    this.autoWard = this.wardFn.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          if (null!=value && value.trim() != '' && this.wardCol != null) {

            const filterValue = value.toLowerCase();
            let filterWard: string[] = [];
            let township_id: number;

            if (this.townshipFn.value.trim() != "") {

              this.addresses['township'].filter((township: string) => {  //filter checks each row
                if (this.townshipFn.value == township['name'])
                  township_id = township['id'];
              })

              this.addresses['ward'].filter((ward: string) => {
                if (township_id == ward['township_id'])
                  filterWard.push(ward['name'])
              })

              return filterWard.filter(filterWardCol =>
                filterWardCol.toLowerCase().includes(filterValue));
            }

            return this.wardCol.filter(wardCol =>
              wardCol.toLowerCase().includes(filterValue));

          } else return null;
        })
      );

    //error this.addresses.filter is not a function, filter is only for array
    // this.autoWard = this.wardFn.valueChanges 
    //   .pipe(
    //     startWith(''),
    //     map(value => {
    //       if (value && value.trim() != '' && this.wardCol != null) {

    //         const filterValue = value.toLowerCase();
    //         let filterWard: string[] = [];

    //         this.addresses.filter(addresses => {
    //           if (this.townshipFn.value == addresses['township'] && !filterWard.includes(addresses['ward']) /*to prevent duplicates*/)
    //             filterWard.push(addresses['ward'])
    //           // console.log("log: " + JSON.stringify(addresses));
    //           // console.log("log: " + addresses['ward']);
    //         })

    //         // if(this.townshipFn.value != '') if(this.townshipFn.value)
    //         if (filterWard.length > 0)
    //           return filterWard.filter(filterWardCol =>
    //             filterWardCol.toLowerCase().includes(filterValue));
    //         else
    //           return this.wardCol.filter(wardCol =>
    //             wardCol.toLowerCase().includes(filterValue));

    //       } else return null;
    //     })
    //   );

    this.autoStreet = this.streetFn.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          if (value && value.trim() != '' && this.streetCol != null) {

            const filterValue = value.toLowerCase();
            let filterStreet: string[] = [];
            let ward_id: string;

            if (this.wardFn.value.trim() != "") {

              this.addresses['ward'].filter((ward: string) => {  //filter checks each row
                if (this.wardFn.value == ward['name'])
                  ward_id = ward['id'];
              })

              this.addresses['street'].filter((street: string) => {
                if (ward_id == street['ward_id'])
                  filterStreet.push(street['name'])
              })

              return filterStreet.filter(filterWardCol =>
                filterWardCol.toLowerCase().includes(filterValue));
            }

            return this.streetCol.filter(streetCol =>
              streetCol.toLowerCase().includes(filterValue));

          } else return null;
        })
      );

  }   //matAutocomplete function


  // - - - - - - - - - - -  End Constructor - - - - - - - - - - -


  // - - - - - - - - - - -  getValues - - - - - - - - - - -
  get cnameFn() { return this.registrationForm.get('customerForm').get('cname') }
  get ph1Fn() { return this.registrationForm.get('customerForm.ph1') }
  get ph2Fn() { return this.registrationForm.get('customerForm.ph2') }
  get houseNoFn() { return this.registrationForm.get('customerForm.houseNo') }
  get floor_roomFn() { return this.registrationForm.get('customerForm.floor_room') }

  get zoneFn() { return this.registrationForm.get('addressForm').get('zone') }
  get townshipFn() { return this.registrationForm.get('addressForm.township') }
  get wardFn() { return this.registrationForm.get('addressForm.ward') }
  get streetFn() { return this.registrationForm.get('addressForm.street') }

  get order_idFn() { return this.registrationForm.get('orderForm').get('order_id') }
  get orderPosterFn() { return this.registrationForm.get('orderForm.orderPoster') }
  get planTypeFn() { return this.registrationForm.get('orderForm.planType') }
  get cpeTypeFn() { return this.registrationForm.get('orderForm.cpeType') }
  get useTypeFn() { return this.registrationForm.get('orderForm.useType') }
  get orderChannelFn() { return this.registrationForm.get('orderForm.orderChannel') }
  get how_u_knowFn() { return this.registrationForm.get('orderForm.how_u_know') }
  get remarkFn() { return this.registrationForm.get('orderForm').get('remark') }

  get orderFn() { return this.registrationForm.get('orderForm') }
  // - - - - - - - - - - -  End getValues - - - - - - - - - - -


  // - - - - - - - - - - -  FormSubmit - - - - - - - - - - -
  // onFormSubmit(form: NgForm){
  //   console.log(form);
  // }
  onFormSubmit() {
    // console.log(this.registrationForm.get('addressForm').get('zone').value)
    // console.log(this.orderFn.value)
    // console.log(this.registrationForm.get('orderForm').value)
    // console.log(this.registrationForm.get('orderForm.order_id').value)
    console.log(this.registrationForm.value);


    this.operationService.addOperation(this.registrationForm.value)
      .subscribe(
        response => {
          console.log("Component Success", response)

          this.toastr.success('Order Success', "Frontiir",
            { closeButton: true, timeOut: 5000, extendedTimeOut: 1000 })

          // this.registrationForm.get('orderForm').reset();
          this.registrationForm.reset();
        },
        error => {
          console.log("Component Error", error)

          this.toastr.error('Oops, Something went wrong', "Frontiir",
            { closeButton: true, timeOut: 5000, extendedTimeOut: 1000 })
        },
        () => {
          console.log("complete");          
          this.router.navigate(['list']);
        }
      );
      // this.initializeRegForm();

   //Order Service - - - - - - - - - - - -
    // let orderObj : Order = this.orderFn.value;
    // console.log("obj" + orderObj)
    // this.orderService.addOrder(this.registrationForm.get('orderForm').value)
    //   .subscribe(
    //     response => console.log(`Component Success ${response.order_id}`, response),
    //     error => console.log("Component Error", error)
    //   );

    // let obj: Order = { 'order_id': 15, 'orderPoster': 'myposter' }
    // this.orderService.addOrder(obj)
    //   .subscribe(
    //     response => console.log("Component Success", response),
    //     error => console.log("Component Error", error)
    //   );

    // this.orderService.addOrder({'order_id':2, 'orderPoster': 'poster'})
    //   .subscribe(
    //     response => console.log("Success", response),
    //     error => console.log("error", error)
    //   );
    //Order Service - - - - - - - - - - - -

  }   //onFormSubmit

  // - - - - - - - - - - - End  FormSubmit - - - - - - - - - - -

}   //end class
