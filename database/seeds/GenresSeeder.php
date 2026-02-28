<?php

use Illuminate\Database\Seeder;

class GenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('genres')->insert([
            ['id' => 1, 'name' => 'サルサ', 'details' => '', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 2, 'name' => 'バチャータ', 'details' => '', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 3, 'name' => 'メレンゲ', 'details' => '', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 4, 'name' => 'キゾンバ', 'details' => '', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 5, 'name' => 'レゲトン', 'details' => '', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 6, 'name' => 'その他', 'details' => '', 'created_at' => new DateTime, 'updated_at' => new DateTime],
        ]);
    }
}
