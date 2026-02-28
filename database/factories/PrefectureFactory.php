<?php

namespace Database\Factories;

use App\Models\Prefecture;
use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrefectureFactory extends Factory
{
    protected $model = Prefecture::class;

    public function definition()
    {
        return [
            'name' => $this->faker->city,
            'region_id' => Region::factory(),
        ];
    }
}
