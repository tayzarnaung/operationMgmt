<?php

namespace App\Http\Controllers;

use App\Address;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

//tail -f storage/logs/laravel-2019-02-28.log

class AddressCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // echo "hi";
        Log::info(Address::all());
        return Address::all();
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
        return Address::create($request->all());
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
        return Address::where('add_id', $id)->first();
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
        $address = Address::where('add_id', $id)->get();
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
        $address = Address::where('add_id', $id)->get();
        $address->delete();
        return 204;
    }
    // public function delete(Request $req, $id){
    //     $address = address::where('add_id',$id)->get();
    //     $address->delete();
    //     return 204;
    // }

    public function getYgnAddress()
    {
        $township = array();
        $township = DB::table('res_district_township')->select(array('id', 'name'))
            ->where('city_id', '=', '1')->orderBy('name', 'asc')->get(); //city_id=1 is YGN

        $ward = DB::table('res_town_ward')->select(array('township_id', 'id', 'name'))
            ->where('town_id', '1')->orderBy('name', 'asc')->get(); //town_id=1 is YGN

        $street = DB::table('res_street_name')->select(array('ward_id', 'name'))->get();

        return (['township' => $township, 'ward' => $ward, 'street' => $street]);
    }
    public function getYgnTownship()
    {
        // $ygnTownship = array();
        $ygnTownship = DB::select('select name  from res_district_township where city_id=?', [1]);
        return $ygnTownship;
    }

    public function getYgnWard($township = null)
    {
        Log::info($township);
        return DB::select('select name from res_town_ward where town_id = ?', [1]); // 1 is Ygn
    }

    public function search(String $township = null)
    {
        $townshipArr = array();
        // echo "search ". $var;
        // if (isset($request->search))
        if (!empty($township)) {
            $data = $township;
            // $search = DB::table('addresses')->where('township','like', "%" . $data . "%")->get();

            $townshipArr = DB::table('addresses')->select('township')->where('township', 'like', "%{$data}%")
                ->orderBy('township', 'asc')->pluck('township'); //["town one", "town two"]

            Log::info($townshipArr);
            return $townshipArr;
        } else {
            Log::info('Input field is empty');
        }
    }
    // public function search(String $var = null, Request $request)
    // {
    //     // echo "search ". $var;
    //     // if (isset($request->search))
    //     if (!empty($request->search)) {
    //         $data = $request->search;
    //         // $search = DB::table('addresses')->where('township','like', "%" . $data . "%")->get();
    //         $search = DB::table('addresses')->where('township', 'like', "%{$data}%")->get();
    //         Log::info($data . $search);
    //         return $search;
    //     } else {
    //         Log::info('Input field is empty');
    //     }
    // }

}
