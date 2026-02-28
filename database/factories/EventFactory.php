<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Prefecture;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->sentence,
            'start_datetime' => $this->faker->dateTimeBetween('now', '+1 month'),
            'end_datetime' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'lesson' => $this->faker->boolean,
            'performance' => $this->faker->boolean,
            'price' => $this->faker->numberBetween(1000, 5000),
            'prefecture_id' => Prefecture::factory(),
            'address' => $this->faker->address,
            'place' => $this->faker->company,
            'station' => $this->faker->word.'駅',
            'details' => $this->faker->paragraph,
            'published' => true,
            'created_date' => now()->toDateString(),
        ];
    }
}
