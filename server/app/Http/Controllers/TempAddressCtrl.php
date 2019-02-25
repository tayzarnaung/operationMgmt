<?php

namespace App\Http\Controllers;

use App\Address;
use App\Customer;
use App\Order;
use App\TempAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
//tail -f storage/logs/laravel-2019-02-28.log

class TempAddressCtrl extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // echo "hi";
        return TempAddress::all();
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
        return TempAddress::create($request->all());
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
        return TempAddress::where('add_id', $id)->first();
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
        // $address= Address::findOrFail($id);
        $address = TempAddress::where('add_id', $id)->get();
        $address->update($request->all());
        return $address;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $address = TempAddress::where('add_id', $id)->get();
        $address->delete();
        return 204;
    }
    // public function delete(Request $req, $id){
    //     $address = address::where('add_id',$id)->get();
    //     $address->delete();
    //     return 204;
    // }

    // public function search(String $var = null, Request $request)
    // {
    //     // echo "search ". $var;
    //     // if (isset($request->search))
    //     if (!empty($request->search)) {
    //         $data = $request->search;
    //         // $search = DB::table('temp_addresses')->where('township','like', "%" . $data . "%")->get();
    //         $search = DB::table('temp_addresses')->where('township', 'like', "%{$data}%")->get();
    //         Log::info($data . $search);
    //         return $search;
    //     } else {
    //         Log::info('Input field is empty');
    //     }
    // }

    public function search(String $township = null)
    {
        $townshipArr = array();
        // echo "search ". $var;
        // if (isset($request->search))
        if (!empty($township)) {
            $data = $township;
            // $search = DB::table('temp_addresses')->where('township','like', "%" . $data . "%")->get();

            $townshipArr = DB::table('temp_addresses')->select('township')->where('township', 'like', "%{$data}%")
                ->orderBy('township', 'asc')->pluck('township');

            Log::info($townshipArr);
            return $townshipArr;
        } else {
            Log::info('Input field is empty');
        }
    }

    public function tempAddressVerify(Request $request)
    {
        Log::info($request);
        $add_id = Address::select('add_id')
            ->where('zone', $request['zone'])
            ->where('township', $request['township'])
            ->where('ward', $request['ward'])
            ->where('street', $request['street'])->first();

        if ($add_id != null) {
            //already exits in permanent address
            $add_id = $add_id->add_id;

            // Address::where('add_id', $add_id)->update([
            //     'zone' => $request['zone'],
            //     'township' => $request['township'],
            //     'ward' => $request['ward'],
            //     'street' => $request['street'],
            // ]);

        } else {
            // $add_id = Address::select('add_id')->orderBy('add_id', 'DESC')->first();
            // $add_id = $add_id['add_id'];
            // ++$add_id;
            // Log::info("Row: " . $add_id);

            $address = new Address();
            $address->zone = $request['zone'];
            $address->township = $request['township'];
            $address->ward = $request['ward'];
            $address->street = $request['street'];
            $address->save();

            $add_id = Address::select('add_id')->orderBy('add_id', 'DESC')->first();
            $add_id = $add_id['add_id'];
        }

        // $address = TempAddress::where('add_id', $request['add_id'])->get();
        // $address->delete();

        Customer::where('cid', $request['cid'])->where('verify', false)->update([
            'add_id' => $add_id,
            'verify' => true,
        ]);

        Order::where('order_id', $request['order_id'])->update(['status' => 'ready']);

        // return Address::where('add_id', $add_id)->first();

    }
}
