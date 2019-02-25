<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    // protected $fillable = ['add_id', 'order_id', 'cname', 'ph1', 'ph2', 'houseNo', 'floor_room'];
    protected $fillable = array('add_id', 'order_id', 'cname', 'ph1', 'ph2', 'houseNo', 'floor_room');
}
