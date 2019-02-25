<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Log;

class OrderCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        // echo 'hi';  //for postman tests
        // return Order::all();
        $orders = Order::all();
        return $orders;
        // echo $orders;
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
        return Order::create($request->all());
    }

    public function store_test()
    {
        $obj = new Order();
        $obj->order_id = 1;
        $obj->orderPoster = "hi it is me";
        $obj->save();
        echo "Success";
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //return Order::find($id);        //::find() can only work with id column
        return Order::where('order_id', $id)->first();
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
        // $order= Order::findOrFail($id);
        $order = Order::where('order_id', $id)->get();
        $order->update($request->all());
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Order::where('order_id', $id)->get();
        $order->delete();
        return 204;
    }
    // public function delete(Request $req, $id){
    //     $order = Order::where('order_id',$id)->get();
    //     $order->delete();
    //     return 204;
    // }

    public function getAllOrderIds()
    {
        // echo 'hi';  //for postman tests
        // return Order::all();
        return Order::select('order_id')->pluck('order_id');
        // return Order::select('order_id')->get();
    }

    public function getStatusWeekly(){
        $weekly = Order::orderBy('status')->groupBy(DB::raw('MONTH(created_at)'))->get();
        Log::info($weekly);
        return $weekly;
    }

    public function updateStatus($order_id, $status){
        Order::where('order_id', $order_id)->update(['status' => $status]);
        return Order::where('order_id', $order_id)->first();
    }
}
