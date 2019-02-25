<?php

namespace App\Http\Controllers;

use App\Address;
use App\Customer;
use App\Order;
use App\TempAddress;
use DB;
use Illuminate\Http\Request;

//tail -f storage/logs/laravel-2019-02-28.log

class OperationCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $customers = Customer::all();
        // $addresses = Address::all();
        // $temp_addresses = TempAddress::all();
        // $orders = Order::all();

        $operation = array();

        $operation['customers'] = Customer::all();
        $operation['addresses'] = Address::all();
        $operation['temp_addresses'] = TempAddress::all();
        $operation['orders'] = Order::all();

        // Log::info($operation);
        return $operation;
        // echo "hi";        // return "hi";
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $add_id = TempAddress::select('add_id')
        //     ->where('zone', $request['addressForm']['zone'])
        //     ->where('township', $request['addressForm']['township'])
        //     ->where('ward', $request['addressForm']['ward'])
        //     ->where('street', $request['addressForm']['street'])->first();

        $township = DB::table('res_district_township')->select('name')
            ->where('name', $request['addressForm']['township'])->pluck('name')->first();

        $ward = DB::table('res_town_ward')->select('name')
            ->where('name', $request['addressForm']['ward'])->pluck('name')->first();

        $street = DB::table('res_street_name')->select('name')
            ->where('name', $request['addressForm']['street'])->pluck('name')->first();

        if ($township && $ward && $street) { //save to permanent if already exist in erp
            // Log::info($township . $ward . $street);

            $add_id = Address::select('add_id')
                ->where('zone', $request['addressForm']['zone'])
                ->where('township', $request['addressForm']['township'])
                ->where('ward', $request['addressForm']['ward'])
                ->where('street', $request['addressForm']['street'])->first();         

                
            if ($add_id == null) {
                $address = new Address();
                $address->zone = $request['addressForm']['zone'];
                $address->township = $request['addressForm']['township'];
                $address->ward = $request['addressForm']['ward'];
                $address->street = $request['addressForm']['street'];
                $address->save();

                $add_id = Address::select('add_id')->orderBy('add_id', 'DESC')->first();
                $add_id = $add_id['add_id'];
                $verify = true; // $verify = 1;
            }else {
                $add_id = $add_id->add_id; 
                $verify = true; // $verify = 1;
            }
           
        } else {
            // $add_id = TempAddress::all()->count();
            // $add_id++;

            $add_id = TempAddress::select('add_id')->orderBy('add_id', 'DESC')->first();
            $add_id = $add_id['add_id'];
            ++$add_id;
            $verify = false; //$verify = 0;
            // Log::info("Row: " . $add_id);

            $address = new TempAddress();
            $address->zone = $request['addressForm']['zone'];
            $address->township = $request['addressForm']['township'];
            $address->ward = $request['addressForm']['ward'];
            $address->street = $request['addressForm']['street'];
            $address->save();
        }

        $customer = new Customer();
        $customer->add_id = $add_id;
        $customer->order_id = (int) $request['orderForm']['order_id'];
        $customer->cname = $request['customerForm']['cname'];
        $customer->ph1 = $request['customerForm']['ph1'];
        $customer->ph2 = $request['customerForm']['ph2'];
        $customer->houseNo = $request['customerForm']['houseNo'];
        $customer->floor_room = $request['customerForm']['floor_room'];
        $customer->verify = $verify;
        $customer->save();

        $order = new Order();
        $order->order_id = $request['orderForm']['order_id'];
        $order->orderPoster = $request['orderForm']['orderPoster'];
        $order->planType = $request['orderForm']['planType'];
        $order->cpeType = $request['orderForm']['cpeType'];
        $order->useType = $request['orderForm']['useType'];
        $order->orderChannel = $request['orderForm']['orderChannel'];
        $order->how_u_know = $request['orderForm']['how_u_know'];
        $order->remark = $request['orderForm']['remark'];
        if ($verify == '1') {
            $order->status = 'ready';
        }
        $order->toInstall = $request['orderForm']['toInstall'];
        $order->save();

        // return $request;

        // Log::info( gettype($request['orderForm']['order_id']) );
        // Log::info( gettype((int) $request['orderForm']['order_id']) );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
