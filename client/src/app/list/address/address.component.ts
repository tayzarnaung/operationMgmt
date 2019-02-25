import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TempAddressService } from 'src/app/shared/temp-address.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private tempAddressServ: TempAddressService,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddressComponent>) { }

  ngOnInit() {
  }

  onClose(reload?: boolean) {
    this.tempAddressServ.form.reset();
    this.tempAddressServ.initializeFormGroup();   //if error here, cannot close
    this.dialogRef.close();
    // if (reload)
      // this.router.navigateByUrl('yangon')
      // this.router.navigate(['list'], {queryParams:{'refresh':"true"}})
  }

  onClear() {
    this.tempAddressServ.form.reset();
    this.tempAddressServ.initializeFormGroup();
  }

  onSubmit() {
    if (this.tempAddressServ.form.valid) {
      this.tempAddressServ.tempAddressVerify(this.tempAddressServ.form.value)
        .subscribe(
          res => console.log("add com ok", res),
          err => console.log("add com err", err)
        );
      // if (!this.tempAddressServ.form.get('add_id').value)
      //   alert('to insert new')
      // this.tempAddressServ.insertTempAddress(this.tempAddressServ.form.value);
      // else
      //   alert('to update')
      //   this.tempAddressServ.updateTempAddress(this.tempAddressServ.form.value);

      this.tempAddressServ.form.reset();
      this.tempAddressServ.initializeFormGroup();
      this.toastr.success(':: Verified Successfully');
      this.onClose(true);
    }
  }

}
