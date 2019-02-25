<html>
  <head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body>
    
  <div class="container">
  <form [formGroup]="registrationForm" (ngSubmit)="onFormSubmit()">
    <div class="row">


      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Contact Information</h5>

            <div formGroupName="customerForm">

              <div class="form-group">
                  <input class="form-control" placeholder="Customer Name" formControlName="cname">             
              </div>

              <div class="form-group row">
                <div class="col">
                  <input class="form-control" placeholder="Phone Number" formControlName="ph1">
                </div>
                <div class="col">
                  <input class="form-control" placeholder="Phone Number" formControlName="ph2">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-6">
                  <input class="form-control" placeholder="House No" formControlName="houseNo">
                </div>
                <div class="col-sm-6">
                  <input class="form-control" placeholder="floor_room" formControlName="floor_room">
                </div>
              </div>

            </div>  

            <!-- -  - - - - - - - - Customer  -  - - - - - - - -  -->


            <!-- -  - - - - - - - - Address  -  - - - - - - - -  -->
            <div formGroupName="addressForm">

              <div class="form-group row">
                <div class="col">
                  <select class="" formControlName="zone">
                    <option disabled selected>- Zone -</option>
                    <option *ngFor="let zone of zone">{{zone}}</option>
                  </select>
                </div>
                <div class="col" *ngIf="otherCondition">
                  <input class="form-control" placeholder="Type zone here" style="border-bottom:1px solid black;">
                </div>
              </div>

              <div class="form-group row">
                <div class="col">
                  <input class="form-control" placeholder="Township" formControlName="township">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-6">
                  <input class="form-control" placeholder="Ward" formControlName="ward">
                </div>
                <div class="col-sm-6">
                  <input class="form-control" placeholder="Street Name" formControlName="street">
                </div>
              </div>

            </div>
            <!-- -  - - - - - - - - Address  -  - - - - - - - -  -->

          </div>
        </div>
      </div> <!-- end contact info column -->



      <!-- -  - - - - - - - - Order Information  -  - - - - - - - -  -->
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Order Information</h5>


            <div formGroupName="orderForm">
              <div class="form-group mt-2">
                <input formControlName="order_id" class="form-control" placeholder="Order Id" [class.is-invalid]="order_idFn.invalid && order_idFn.touched">
                <span *ngIf="order_idFn.invalid && order_idFn.touched" class="text-danger">required</span>
              </div>

              <div class="form-group">
                <input formControlName="orderPoster" class="form-control" placeholder="Order Poster" [class.is-invalid]="this.registrationForm.get('orderForm.orderPoster').invalid && this.registrationForm.get('orderForm.orderPoster').touched">
                <span *ngIf="orderPosterFn.invalid && orderPosterFn.touched" class="text-danger">required</span>
              </div>

              <select name="planType" class="form-group" formControlName="planType">
                <option value="" selected disabled>Plan Type</option>
                <option *ngFor="let plan of planType">{{plan}}</option>
              </select>

              <select name="cpeType" class="form-group" formControlName="cpeType">
                <option value="" selected disabled class="text-info">CPE Type</option>
                <option *ngFor="let cpe of cpeType">{{cpe}}</option>
              </select>

              <select name="useType" class="form-group" formControlName="useType">
                <option value="" selected disabled>Use Type</option>
                <option *ngFor="let use of useType">{{use}}</option>
              </select>

              <select name="orderChannel" class="form-group" formControlName="orderChannel">
                <option value="" selected disabled>Order Channel</option>
                <option *ngFor="let channel of orderChannel">{{channel}}</option>
              </select>

              <select name="how_u_know" class="form-group" formControlName="how_u_know">
                <option value="" selected disabled>How do you know myanmar net?</option>
                <option *ngFor="let item of how_u_know">{{item}}</option>
              </select>

              <div class="form-group">
                <input formControlName="remark" class="form-control" placeholder="remark" [class.is-invalid]="remarkFn.invalid && remarkFn.touched">
                <span *ngIf="remarkFn.invalid && remarkFn.touched" class="text-danger">required</span>
              </div>

              <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" name="toInstall" id="myCheck" formControlName="toInstall">
                <label for="myCheck"> To install</label>
              </div>
            </div>

          </div>
        </div>
      </div> <!-- //end order info column -->



      <div class="form-group mt-5">
        <div class="row ml-auto d-block">
          <button type="reset" class="btn btn-danger mx-2">Reset</button>
          <button type="submit" class="btn btn-success">Submit</button>
        </div>
      </div>
      <!-- [disabled]="!orderForm.valid" [class.btn-danger]="!orderForm.valid" -->

    </div> <!-- end row -->
  </form>
</div> <!-- end container -->

  </body>
</html>
