<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->string('name')->after('user_id');
            $table->string('station')->nullable()->after('place');
            $table->longText('price')->nullable()->after('end_time');
            $table->enum('frequency', ['every_week', 'every_other_week', 'first', 'second', 'third', 'fourth', 'fifth'])->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn('station');
            $table->dropColumn('price');
            $table->dropColumn('frequency');
        });
    }
}
