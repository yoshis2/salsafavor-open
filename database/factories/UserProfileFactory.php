<?php

namespace Database\Factories;

use App\Models\Prefecture;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserProfileFactory extends Factory
{
    protected $model = UserProfile::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'prefecture_id' => Prefecture::factory(),
            'address' => $this->faker->address,
            'web' => $this->faker->url,
            'image_url' => $this->faker->imageUrl(),
            'details' => $this->faker->paragraph,
        ];
    }
}
