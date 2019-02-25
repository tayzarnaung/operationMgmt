<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('order_id')->unique()->nullable();
            $table->string('orderPoster')->nullable();
            $table->string('planType')->nullable();
            $table->string('cpeType')->nullable();
            $table->string('useType')->nullable();
            $table->string('orderChannel')->nullable();
            $table->string('how_u_know')->nullable();
            $table->string('remark')->nullable();
            $table->string('status')->default('received');
            $table->boolean('toInstall')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
