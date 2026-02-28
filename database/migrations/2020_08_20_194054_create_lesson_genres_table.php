<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonGenresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lesson_genres', function (Blueprint $table) {
            $table->unsignedBigInteger('lesson_id');
            $table->unsignedBigInteger('genre_id');
            $table->dateTime('created_at', 0);
            $table->primary(['lesson_id', 'genre_id']);
            $table->foreign('lesson_id')->references('id')->on('lessons'); // 外部キー制約
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
        Schema::dropIfExists('lesson_genres');
    }
}
