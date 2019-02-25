<?php
use App\Order;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// -    -   -   -   -   -   - Orders     - -   -   -   -   -   -
Route::get('/orders',               'OrderCtrl@index');
Route::get('/orders/{order_id}',    'OrderCtrl@show');
Route::post('/orders',         'OrderCtrl@store');
Route::put('/orders/{order_id}',    'OrderCtrl@update');
Route::delete('/orders/{order_id}', 'OrderCtrl@destroy');

// Route::get('/myorders', function(){
//     $obj = new Order();
//     $obj->order_id = 15;
//     $obj->orderPoster = "hi it is me";
//     $obj->save();
//     echo "Success";
// });

Route::get('/myorders/getOrderIds', 'OrderCtrl@getOrderIds');

// -    -   -   -   -   -   - Customers     - -   -   -   -   -   -
Route::get('/customers',               'CustomerCtrl@index');
Route::get('/customers/{cid}',    'CustomerCtrl@show');
Route::post('/customers',              'CustomerCtrl@store');
Route::put('/customers/{cid}',    'CustomerCtrl@update');
Route::delete('/customers/{cid}', 'CustomerCtrl@destroy');


Route::get('create/customers', function(){
    return view('create_customer'); });



// -    -   -   -   -   -   -   Addresses   - -   -   -   -   -   -
Route::get('/addresses',               'AddressCtrl@index');
Route::get('/addresses/{add_id}',    'AddressCtrl@show');
Route::post('/addresses',              'AddressCtrl@store');
Route::put('/addresses/{add_id}',    'AddressCtrl@update');
Route::delete('/addresses/{add_id}', 'AddressCtrl@destroy');


// -    -   -   -   -   -   -   Operation   - -   -   -   -   -   -
// Route::get('/add', function(){return view('add_view'); });
// Route::post('/insert', 'OperationCtrl@insert');

Route::get('/operation', 'OperationCtrl@index');
Route::get('/operation_post', 'OperationCtrl@store_test');


Route::get('/searchPage', function(){
    return view('search');
});
Route::get('search', 'OperationCtrl@search');
Route::get('search/{value}', 'OperationCtrl@search');