<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUsersAddSomeColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->enum('roles', ['admin', 'instructor'])->after('password');
            $table->boolean('published')->default(true)->after('roles');
            $table->boolean('withdrawal')->default(false)->after('published');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn('withdrawal');
            $table->dropColumn('published');
            $table->dropColumn('roles');
        });
    }
}
