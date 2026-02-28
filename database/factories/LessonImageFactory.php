<?php

namespace Database\Factories;

use App\Models\LessonImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonImageFactory extends Factory
{
    protected $model = LessonImage::class;

    public function definition()
    {
        return [
            'lesson_id' => null,
            'image_url' => $this->faker->word.'.jpg',
            'order' => 1,
        ];
    }
}
