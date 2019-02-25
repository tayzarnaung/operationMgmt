<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// -    -   -   -   -   -   - Orders     - -   -   -   -   -   -
Route::get('/orders',               'OrderCtrl@index');
Route::get('/orders/{order_id}',    'OrderCtrl@show');
Route::post('/orders',              'OrderCtrl@store');
Route::put('/orders/{order_id}',    'OrderCtrl@update');
Route::delete('/orders/{order_id}', 'OrderCtrl@destroy');

Route::get('/myorders/getAllOrderIds', 'OrderCtrl@getAllOrderIds');
Route::get('/updateStatus/{order_id}/{status}', 'OrderCtrl@updateStatus');


// -    -   -   -   -   -   - Customers     - -   -   -   -   -   -
Route::get('/customers',               'CustomerCtrl@index');
Route::get('/customers/{cid}',    'CustomerCtrl@show');
Route::post('/customers',              'CustomerCtrl@store');
Route::put('/customers/{cid}',    'CustomerCtrl@update');
Route::delete('/customers/{cid}', 'CustomerCtrl@destroy');


// -    -   -   -   -   -   -   Addresses   - -   -   -   -   -   -
Route::get('/addresses',               'AddressCtrl@index');
Route::get('/addresses/{add_id}',    'AddressCtrl@show');
Route::post('/addresses',              'AddressCtrl@store');
Route::put('/addresses/{add_id}',    'AddressCtrl@update');
Route::delete('/addresses/{add_id}', 'AddressCtrl@destroy');

Route::get('/getYgnAddress', 'AddressCtrl@getYgnAddress');
Route::get('/getYgnTownship', 'AddressCtrl@getYgnTownship');
Route::get('/getYgnWard/{township}', 'AddressCtrl@getYgnWard');

Route::get('/tempAddresses',               'TempAddressCtrl@index');
Route::get('/tempAddresses/{add_id}',    'TempAddressCtrl@show');
Route::post('/tempAddresses',              'TempAddressCtrl@store');
Route::put('/tempAddresses/{add_id}',    'TempAddressCtrl@update');
Route::delete('/tempAddresses/{add_id}', 'TempAddressCtrl@destroy');

Route::post('/tempAddressVerify' , 'TempAddressCtrl@tempAddressVerify');



Route::get('/operation', 'OperationCtrl@index');
Route::post('/operation', 'OperationCtrl@store');
//   Route::group(["prefix" => "work_order"], function() {
//     Route::get("summary/all", "WorkOrderController@summaryAll");
//     Route::post("create", "WorkOrderController@create");
//     Route::get("search", "WorkOrderController@search");
//   });

//   Route::group(["prefix" => "location"], function() {
//     Route::get("street/{name}", "LocationController@street");
//     Route::get("township/{name}", "LocationController@township");
//     Route::get("ward/{name}", "LocationController@ward");
//     Route::get("city/{name}", "LocationController@city");
//     Route::get("state/{name}", "LocationController@state");
//     Route::get("country/{name}", "LocationController@country");
//     Route::get("full_address/{name}", "LocationController@fullAddress");
//     Route::get("search", "LocationController@search");
//   });

Route::get('search/{township}', 'AddressCtrl@search');
// Route::get('search', 'AddressCtrl@search');

