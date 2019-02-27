import { Component, OnInit, ViewChild } from '@angular/core';

import { OperationService } from '../shared/operation.service';

import { Operation } from '../shared/operation.model';
import { Customer } from '../shared/customer.model';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Address } from '../shared/address.model';
import { Order } from '../shared/order.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AddressComponent } from './address/address.component';
import { TempAddressService } from '../shared/temp-address.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [OrderService]
})

export class ListComponent implements OnInit {
  d_Cols: string[] = ['Order_id', 'name', 'Address', 'Verify', 'Status', 'Actions']
  matTbl: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string = '';

  opList: Operation[] = [];
  operation: Operation[];
  customers: Customer[]; addresses: Address[]; temp_addresses: Address[]; orders: Order[];
  navigationSubscription;
  constructor(
    private operationService: OperationService,
    private tempAddressServ: TempAddressService,
    private orderServ: OrderService,
    private router: Router,
    private dialog: MatDialog,
  ) { 
    this.navigationSubscription = this.router.events.subscribe( (e:any) => {
      if(e instanceof NavigationEnd){
        this.ngOnInit();
      }
    });
  }


  ngOnInit() {

    this.operationService.getOperation().subscribe(operation => { //object
      this.operation = operation;
      console.log(this.operation);


      this.customers = this.operation["customers"]  //object    
      this.addresses = this.operation["addresses"]
      this.temp_addresses = this.operation['temp_addresses']
      // this.orders = this.operation['orders']

      // this.customers.filter( customer => { //loop for customer row 
      //   if( customer['verify']==true){
      //     console.log(customer);          
      //   }
      // })

      let newCustomers: Customer[] = [];

      // for(let i=0; i<this.customers.length ; i++){
      for (let i in this.customers) {   //loop for customer row

        this.customers[i]['status'] = this.operation['orders'][i]['status']

        if (this.customers[i]['verify']) {

          this.addresses.filter(address => {
            if (address['add_id'] == this.customers[i]['add_id']) {
              // console.log(address);        // console.log(this.customers[i]);

              for (const [key, value] of Object.entries(address))
                // console.log(key , value);                
                this.customers[i][key] = value;

              newCustomers.push(this.customers[i]);
            }
          });   //filter


        }
        else {
          this.temp_addresses.filter(address => {
            if (address['add_id'] == this.customers[i]['add_id']) {
              // console.log(address);       // console.log(this.customers[i]);

              for (let key in address)
                // if (address.hasOwnProperty(key))   //no more work in Angular 7
                this.customers[i][key] = address[key]

              newCustomers.push(this.customers[i])
            }
          });   //filter
        }

      }   //end for loop

      // let opList: Operation[] = [];
      this.opList = <any>newCustomers
      // console.log(this.opList);

      // console.log(newCustomers);
      this.matTbl = new MatTableDataSource(this.opList)
      // console.log(this.matTbl.filteredData);

      // this.matTbl = new MatTableDataSource([
      //   { "zone": "A", "township": "town one", "ward": "ward one", "street": "street one" },
      //   { zone: "B", township: "town two", ward: "ward two", street: "street two" }
      // ]);

      this.matTbl.sort = this.sort;
      this.matTbl.paginator = this.paginator;
    });    //subscribe
  }

  ngOnDestroy(){
    if(this.navigationSubscription)
      this.navigationSubscription.unsubscribe();
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.matTbl.filter = this.searchKey.trim().toLowerCase();
  }


  onEdit(row: Operation) {
    //  console.log(row);


    // if (row.verify == true)
    if (row['verify']) {
      //   let order: Order = { 'order_id':null,orderPoster:'', planType:'', cpeType:'', useType:'', how_u_know:'',
      // 'orderChannel':'', 'remark':'', status:'', 'toInstall':null}
      let order: Order;

      // this.orderServ.getOrder(row.order_id).subscribe(
      //   res => { 
      //     order = res;

      //     this.orderServ.populateOrder(order);  
      //     //call to 2nd time to orderServ when subscribe. This is error.
      //     const dialogConfig = new MatDialogConfig();
      //     dialogConfig.disableClose = true;
      //     dialogConfig.autoFocus = true;
      //     dialogConfig.width = "90%"
      //     this.dialog.open(OrderComponent, dialogConfig);

      //   }
      // );

      this.orderServ.getOrder(row.order_id).subscribe(
        res => { 
          order = res;

          this.tempAddressServ.populateOrder(order);  
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = "80%"
          dialogConfig.height="50%"
          this.dialog.open(OrderComponent, dialogConfig);
        }
      );
    } else {
      let address: Address = { 'add_id': 0, 'street': '', 'ward': '', 'zone': '', 'township': '' };

      for (let key in address)
        address[key] = row[key]

      // address.add_id = row.add_id;
      // address.street = row.street;
      // address.township = row.township;
      // address['ward'] = row.ward;
      // address['zone'] = row.zone;

      this.tempAddressServ.populateForm(address, row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%"
      dialogConfig.height = "60%"
      this.dialog.open(AddressComponent, dialogConfig);
    }

  }

}
