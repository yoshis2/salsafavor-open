<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventGenresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_genres', function (Blueprint $table) {
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('genre_id');
            $table->dateTime('created_at', 0);
            $table->primary(['event_id', 'genre_id']);
            $table->foreign('event_id')->references('id')->on('events'); // 外部キー制約
            $table->foreign('genre_id')->references('id')->on('genres'); // 外部キー制約
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_genres');
    }
}
