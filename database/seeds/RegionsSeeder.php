<?php

use Illuminate\Database\Seeder;

class RegionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('regions')->insert([
            ['id' => 1, 'name' => '北海道地方'],
            ['id' => 2, 'name' => '東北地方'],
            ['id' => 3, 'name' => '関東地方'],
            ['id' => 4, 'name' => '中部地方'],
            ['id' => 5, 'name' => '近畿地方'],
            ['id' => 6, 'name' => '中国地方'],
            ['id' => 7, 'name' => '四国地方'],
            ['id' => 8, 'name' => '九州地方'],
        ]);
    }
}
