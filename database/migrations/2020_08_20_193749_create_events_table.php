<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->dateTime('start_datetime')->nullable();
            $table->dateTime('end_datetime')->nullable();
            $table->longText('price')->nullable();
            $table->unsignedBigInteger('prefecture_id');
            $table->string('address')->nullable();
            $table->string('place')->nullable();
            $table->string('dj')->nullable();
            $table->string('owner')->nullable();
            $table->string('web')->nullable();
            $table->string('mail')->nullable();
            $table->string('phone')->nullable();
            $table->longText('details')->nullable();
            $table->boolean('published')->default(true);
            $table->dateTime('created_at', 0);
            $table->dateTime('updated_at', 0);
            $table->foreign('user_id')->references('id')->on('users'); // 外部キー制約
            $table->foreign('prefecture_id')->references('id')->on('prefectures'); // 外部キー制約
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
