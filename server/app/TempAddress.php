<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TempAddress extends Model
{
    protected $fillable = ['zone', 'township', 'ward', 'street'];
    // protected $fillable = array('zone', 'township', 'ward', 'street');
}
