import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TempAddressService } from 'src/app/shared/temp-address.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: Order;
  status: string[] = ['cancel', 'ready', 'dispatched', 'completed']
  selectedStatus: string; 

  constructor(
    private tempAddressServ: TempAddressService,
    private orderServ: OrderService,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<OrderComponent>) { }

  ngOnInit() {
    this.orderForm = this.tempAddressServ.orderForm;    
    // console.log(this.orderServ.orderForm);   
    
    this.selectedStatus =  this.tempAddressServ.orderForm.status;     
  }

  onClose(reload?: boolean) {
    this.dialogRef.close();
    // if (reload)
    // this.router.navigateByUrl('yangon')
    // this.router.navigate(['list'], {queryParams:{'refresh':"true"}})
  }


  onClick(order_id: number) {
    // console.log(this.selectedStatus);
     
    // console.log(this.orderServ.orderForm.order_id);

    this.tempAddressServ.orderForm.status = this.selectedStatus;
    console.log(this.tempAddressServ.orderForm.status);   

    this.orderServ.updateStatus(order_id, this.selectedStatus)
      .subscribe(res => console.log("com", res),
        err => console.log("com error", err)
      );

      
      this.toastr.success(`:: Status changed to ${this.selectedStatus} at id ` + this.orderForm.order_id);
      this.onClose(true);
      this.router.navigate(['list'])
  }

  onSubmit() {
    console.log(this.selectedStatus);
     
    // console.log(this.orderServ.orderForm.order_id);

    // this.tempAddressServ.orderForm.status = this.selectedStatus;
    console.log(this.tempAddressServ.orderForm);   

    // this.orderServ.updateStatus(this.orderServ.orderForm.order_id, this.selectedStatus)
    //   .subscribe(res => console.log("com", res),
    //     err => console.log("com error", err)
    //   );

    // this.toastr.success(`:: Status changed to ${this.selectedStatus} at id ` + this.orderForm.order_id);
    // this.onClose(true);
  }


}
