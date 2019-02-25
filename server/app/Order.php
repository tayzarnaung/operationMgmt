<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['order_id', 'orderPoster', 'planType', 'cpeType', 'useType', 'orderChannel',
         'how_u_know', 'remark','status', 'toInstall'];
}
