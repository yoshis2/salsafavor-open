<?php

namespace Database\Factories;

use App\Models\EventImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventImageFactory extends Factory
{
    protected $model = EventImage::class;

    public function definition()
    {
        return [
            'event_id' => null,
            'image_url' => $this->faker->word.'.jpg',
            'order' => 1,
        ];
    }
}
