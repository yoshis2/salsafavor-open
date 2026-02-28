<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOrderToEventImagesAndLessonImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('event_images', function (Blueprint $table) {
            $table->integer('order')->after('image_url')->nullable(false);
        });

        Schema::table('lesson_images', function (Blueprint $table) {
            $table->integer('order')->after('image_url')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('event_images', function (Blueprint $table) {
            $table->dropColumn('order');
        });

        Schema::table('lesson_images', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
}
