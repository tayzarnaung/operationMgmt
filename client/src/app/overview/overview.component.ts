import { Component, OnInit } from '@angular/core';


import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [OrderService]
})
export class OverviewComponent implements OnInit {

  status: String[] = [];
  cancelCountMonthly = 0; receivedCountMonthly = 0; readyCountMonthly = 0; dispatchedCountMonthly = 0; completedCountMonthly = 0;
  cancelCountWeekly = 0; receivedCountWeekly = 0; readyCountWeekly = 0; dispatchedCountWeekly = 0; completedCountWeekly = 0;
  cancelCountDaily = 0; receivedCountDaily = 0; readyCountDaily = 0; dispatchedCountDaily = 0; completedCountDaily = 0;

  constructor(private orderServ: OrderService) { }

  ngOnInit() {
 
    this.orderServ.getOrders().subscribe(responseOrders => {
      let orders: Order[];
      orders = responseOrders
      console.log("orders:", orders)

      for (let each in responseOrders)
        this.status.push(responseOrders[each]['status']);

      //- - - - - - -  Alternatives Method - - - - - - - - 
      // for (let value of this.status)
      // console.log(value);

      // for(let i in this.status)
      // for (let i = 0; i < this.status.length; i++)
      // console.log(this.status[i]);

      // this.status.filter(status => {
      //   switch (status.toLowerCase()) {
      //     case 'cancel': this.cancelCountMonthly++; break;
      //     case 'received': this.receivedCountMonthly++; break;
      //     case 'ready': this.readyCountMonthly++; break;
      //     case 'dispatched': this.dispatchedCountMonthly++; break;
      //     case 'completed': this.completedCountMonthly++; break;
      //   }
      // });

      //- - - - - - - - - - - - - - - 

      var today = new Date();
      var first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
      // var firstday = new Date(curr.setDate(first)).toUTCString();
      // var lastday = new Date(curr.setDate(last)).toUTCString();
      console.log(first, last);

      let dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()

      // var month = today.getMonth() + 1; // Jan is 0; we want 1 for Jan
      let mm = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)

      var yyyy = today.getFullYear();


      orders.filter(orders => {
        let status: string = orders.status;
        let created_at: string = orders['created_at']

        let year = +created_at.slice(0, 4)  //+ sign to change number
        let month = +created_at.slice(5, 7)
        let day = +created_at.slice(8, 10)
        console.log(day, dd);


        if (year == yyyy && month == mm && (first <= day && day <= last))
          switch (status.toLowerCase()) {
            case 'cancel': this.cancelCountWeekly++; break;
            case 'received': this.receivedCountWeekly++; break;
            case 'ready': this.readyCountWeekly++; break;
            case 'dispatched': this.dispatchedCountWeekly++; break;
            case 'completed': this.completedCountWeekly++; break;
          }

        if (year == yyyy && month == mm && day == dd)
          switch (status.toLowerCase()) {
            case 'cancel': this.cancelCountDaily++; break;
            case 'received': this.receivedCountDaily++; break;
            case 'ready': this.readyCountDaily++; break;
            case 'dispatched': this.dispatchedCountDaily++; break;
            case 'completed': this.completedCountDaily++; break;
          }

        if (year == yyyy && month == mm)
          switch (status.toLowerCase()) {
            case 'cancel': this.cancelCountMonthly++; break;
            case 'received': this.receivedCountMonthly++; break;
            case 'ready': this.readyCountMonthly++; break;
            case 'dispatched': this.dispatchedCountMonthly++; break;
            case 'completed': this.completedCountMonthly++; break;
          }
      })
      // console.log(this.cancelCountWeekly);
      // console.log(this.receivedCountWeekly);
      // console.log(this.readyCountWeekly);
      // console.log(this.completedCountWeekly);
      // console.log(this.dispatchedCountWeekly);

      // console.log(this.cancelCountDaily);
      // console.log(this.receivedCountDaily);
      // console.log(this.readyCountDaily);
      // console.log(this.completedCountDaily);
      // console.log(this.dispatchedCountDaily);

      // console.log(this.cancelCountMonthly);
      // console.log(this.receivedCountMonthly);
      // console.log(this.readyCountMonthly);
      // console.log(this.completedCountMonthly);
      // console.log(this.dispatchedCountMonthly);


      // var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      // console.log(utc);

      // var objToday = new Date(),
      // 	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
      // 	dayOfWeek = weekday[objToday.getDay()],
      // 	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate()  : objToday.getDate() ,
      // 	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
      // 	curMonth = months[objToday.getMonth()],
      // 	curYear = objToday.getFullYear(),
      // 	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
      // 	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
      // 	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
      // 	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
      // var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

      // console.log(today);
    });
  }

  // edit(order){
  //   this.editOrder = order
  // }


}
