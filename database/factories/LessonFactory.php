<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\Prefecture;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->sentence,
            'frequency' => $this->faker->randomElement(['every_week', 'every_other_week', 'first', 'second', 'third', 'fourth', 'fifth']),
            'week' => $this->faker->randomElement(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
            'start_time' => $this->faker->time('H:i'),
            'end_time' => $this->faker->time('H:i'),
            'price' => $this->faker->numberBetween(1000, 5000),
            'prefecture_id' => Prefecture::factory(),
            'address' => $this->faker->address,
            'place' => $this->faker->company,
            'station' => $this->faker->word.'駅',
            'instructor' => $this->faker->name,
            'details' => $this->faker->paragraph,
            'published' => true,
            'created_date' => now()->toDateString(),
        ];
    }
}
