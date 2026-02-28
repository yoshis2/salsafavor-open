<?php

namespace Tests\Unit\Repositories;

use App\Models\Prefecture;
use App\Models\User;
use App\Models\UserProfile;
use App\Repositories\UserProfilesRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserProfilesRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new UserProfilesRepository(new UserProfile);
    }

    public function test_get_returns_profile()
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(['user_id' => $user->id]);

        $result = $this->repository->get($user->id);

        $this->assertNotNull($result);
        $this->assertEquals($user->id, $result->user_id);
    }

    public function test_store_creates_profile()
    {
        $user = User::factory()->create();
        $pref = Prefecture::factory()->create();
        $now = now()->toDateTimeString();

        $param = [
            'prefecture_id' => $pref->id,
            'address' => 'Profile Address',
            'web' => 'http://example.com',
            'details' => 'Profile Details',
        ];

        $this->repository->store($param, $user->id, 'image.jpg', $now);

        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
            'image_url' => 'image.jpg',
        ]);
    }

    public function test_update_profile()
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(['user_id' => $user->id, 'address' => 'Old Address']);
        $now = now()->toDateTimeString();

        $param = [
            'prefecture_id' => $profile->prefecture_id,
            'address' => 'New Address',
            'web' => $profile->web,
            'details' => $profile->details,
        ];

        $this->repository->update($param, $user->id, $profile->image_url, $now);

        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
            'address' => 'New Address',
        ]);
    }
}
